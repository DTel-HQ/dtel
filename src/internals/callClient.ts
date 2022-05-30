import DTelClient from "./client";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { Client, CommandInteraction, Message, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbedOptions, MessageOptions, Permissions } from "discord.js";
import { DiscordAPIError } from "@discordjs/rest";
import { PermissionLevel } from "../interfaces/commandData";
import { Calls, Numbers, pickedUp } from "@prisma/client";
import { db } from "../database/db";
import config from "../config/config";

type CallSide = "from" | "to";

interface CallOptions {
	from: string,
	to: string,
	random: boolean,
	startedBy: string,
	vip?: {
		expiry: Date,
		hiddenNumberDisplay: boolean,
		customCallerDisplay: string
	}
}

interface ClientCallParticipant extends Numbers {
	locale: string,
}

type CallsWithNumbers = Calls & {
	to: Numbers,
	from: Numbers,
};
export { CallsWithNumbers };

// TODO: Add guild config reference to call documents
// Use it to set a server wide locale for anything we need to reply to the user about

export default class CallClient implements CallsWithNumbers {
	primary = false;

	id: string = uuidv4();
	toNum = "";
	fromNum = "";
	to!: ClientCallParticipant;
	from!: ClientCallParticipant;
	pickedUp!: { at: Date; by: string; };
	randomCall = false;
	started!: { at: Date, by: string };
	active = true;

	otherSideShardID = 0;

	client: DTelClient;

	constructor(client: DTelClient, options?: CallOptions, dbCallDoc?: Calls) {
		this.client = client;

		if (dbCallDoc) {
			Object.assign(this, dbCallDoc);
			return;
		}
		options = options as CallOptions; // Strict mode avoider

		this.fromNum = options.from;
		this.toNum = options.to;

		this.randomCall = options.random;
		this.started = {
			by: options.startedBy,
			at: new Date(),
		};
	}

	static async byID(client: DTelClient, options: { id?: string, doc?: CallsWithNumbers, side: CallSide }): Promise<CallClient> {
		let callDoc: CallsWithNumbers;
		if (options.doc) {
			callDoc = options.doc;
		} else {
			const tempDoc = await client.db.calls.findUnique({
				where: {
					id: options.id,
				},
				include: {
					to: true,
					from: true,
				},
			});
			if (!tempDoc) throw new Error(t("callNotFound"));
			else callDoc = tempDoc;
		}

		const callManager = new CallClient(client, undefined, callDoc);
		callManager.primary = options.side === "from";
		callManager.otherSideShardID = await client.shardIdForChannelId(options.side === "from" ? callDoc.to.channelID : callDoc.from.channelID);

		client.calls.push(callManager);

		return callManager;
	}

	async initiate(): Promise<void> {
		this.primary = true;

		// Get the number in the correct format for DB query (all numbers)
		this.toNum = this.client.parseNumber(this.toNum);
		const aliasNumbers = config.aliasNumbers as { [key: string] : string };
		if (aliasNumbers[this.toNum]) this.toNum = aliasNumbers[this.toNum];
		if (this.toNum.length != 11) throw new Error("numberInvalid");

		if (this.fromNum === this.toNum) throw new Error("callingSelf");

		// Get both numbers in one query (clean code)
		const participants = await db.numbers.findMany({
			where: {
				OR: [{
					number: this.toNum,
				}, {
					number: this.fromNum,
				}],
			},
			include: {
				incomingCalls: true,
				outgoingCalls: true,
			},
		});

		// TODO: Find out if the from side is able to call (ie not expired)
		const fromNumber = participants.find(p => p.number === this.fromNum);
		if (!fromNumber) throw new Error("invalidFrom");
		this.from = fromNumber;

		if (this.from.expiry < new Date()) throw new Error("thisSideExpired");

		const toNumber = participants.find(p => p.number === this.toNum);

		// Preflight checks
		if (!toNumber) throw new Error("toNumNotFound");
		if (toNumber.expiry < new Date()) throw new Error("otherSideExpired");
		if (toNumber.blocked.includes(this.from.number)) throw new Error("otherSideBlockedYou");

		this.to = toNumber;

		// TODO: Check for pre-existing calls and do embed stuff
		// and that includes stuff like call-waiting

		const otherSideInCall = await db.calls.findFirst({
			select: { id: true },
			where: {
				OR: [{
					toNum: this.toNum,
				}, {
					fromNum: this.toNum,
				}],

				active: true,
			},
		});

		if (otherSideInCall) {
			throw new Error("otherSideInCall");
		}

		// Don't bother sending it if we can find it on this shard
		try {
			await this.client.channels.fetch(this.to.channelID);
		} catch {
			// Send the call to another shard if required
			// This is probably the best way to do it as it tells us if it was successful
			this.otherSideShardID = await this.client.shardIdForChannelId(this.to.channelID);

			if (!this.otherSideShardID) {
				await db.calls.delete({
					where: {
						id: this.id,
					},
				});
				throw new Error("numberMissingChannel");
			}

			// THIS CAN THROW callNotFound
			await this.client.shard?.broadcastEval<void, string>(async(_client: Client, context: string): Promise<void> => {
				const client = _client as DTelClient;
				client.calls.push(await require(`${__dirname}/../internals/callClient`).default.byID(client, {
					id: context,
					side: "to",
				}));
			}, {
				shard: this.otherSideShardID,
				context: this.id,
			});
		}

		let fromCallerDisplay = this.from.number;
		if (Number(this.from.vip?.expiry) > Date.now()) {
			if (this.from.vip?.name) fromCallerDisplay = this.from.vip?.name;
			else if (this.from.vip?.hidden) fromCallerDisplay = "Hidden";
		}

		try {
			await this.client.sendCrossShard({
				embeds: [{
					color: this.client.config.colors.info,
	
					...(t("commands.call.incomingCall", {
						lng: this.to.locale,
						number: fromCallerDisplay,
						callID: this.id,
					}) as MessageEmbedOptions),
				}],
				components: [
					new MessageActionRow()
						.addComponents([
							new MessageButton({
								customId: "call-pickup",
								label: t("commands.call.pickup")!,
								style: "PRIMARY",
								emoji: "📞",
							}),
						])
						.addComponents([
							new MessageButton({
								customId: "call-hangup",
								label: t("commands.call.hangup")!,
								style: "SECONDARY",
								emoji: "☎️",
							}),
						]),
				],
			}, this.to.channelID);
		} catch (err: unknown) {
			this.client.sendCrossShard({
				embeds: [
					this.client.errorEmbed(t("commands.call.errors.couldntReachOtherSide", { locale: this.locale } )),
				],
			}, this.from.channelID);

			return;
		}

		await db.calls.create({
			data: {
				...this,
				client: undefined,
				otherSideShardID: undefined,
				primary: undefined,
				to: undefined,
				from: undefined,
				messages: undefined,
				pickedUp: {
					set: {
						at: null,
						by: null,
					},
				},
			},
		});
		this.client.calls.push(this);
	}


	async setupPickupTimer(callNotifMsgID: string): Promise<void> {
		setTimeout(async() => {

		});
	}

	async pickup(interaction: MessageComponentInteraction, pickedUpBy: string): Promise<void> {
		this.pickedUp = {
			at: new Date(),
			by: pickedUpBy,
		};

		await this.client.editCrossShard({
			embeds: interaction.message.embeds,
			components: [],
		}, interaction.channelId, interaction.message.id).catch(() => null);


		if (this.otherSideShardID) {
			type ctx = { callID: string, pickedUp: pickedUp };
			await this.client.shard?.broadcastEval<void, ctx>(async(_client: Client, context): Promise<void> => {
				const client = _client as DTelClient;
				const callHandler = client.calls.find(c => c.id === context.callID);
				if (!callHandler) throw new Error("No handler");

				callHandler.pickedUp = {
					at: context.pickedUp.at as unknown as Date,
					by: context.pickedUp.by as string,
				};
			}, {
				shard: this.otherSideShardID,
				context: {
					callID: this.id,
					pickedUp: this.pickedUp,
				},
			});
		}

		await db.calls.update({
			where: {
				id: this.id,
			},
			data: {
				pickedUp: this.pickedUp,
			},
		});

		interaction.reply({
			embeds: [{
				color: this.client.config.colors.success,

				...(t("commands.call.thisSidePickedUp", {
					lng: this.to.locale,
					callID: this.id,
				}) as MessageEmbedOptions),
			}],
		});

		this.client.sendCrossShard({
			embeds: [{
				color: this.client.config.colors.success,

				...(t("commands.call.otherSidePickedUp", {
					lng: this.to.locale,
					callID: this.id,
				}) as MessageEmbedOptions),
			}],
		}, this.from.channelID);
	}

	async handleMessage(message: Message): Promise<void> {
		if (!this.pickedUp.by) return;

		const userPerms = await this.client.getPerms(message.author.id);
		const sideToSendTo = this.from.channelID === message.channel.id ? this.to : this.from;

		const toSend: MessageOptions = { content: `**${message.author.tag}`, embeds: [] };

		// TODO: images

		if (sideToSendTo.number === this.client.config.supportGuild.supportNumber) {
			toSend.content += `(${message.author.id})`;
		}

		const { callPhones } = this.client.config;
		let phone = "";

		if (userPerms < PermissionLevel.customerSupport && (message.member?.permissions as Permissions).has(Permissions.FLAGS.MANAGE_GUILD)) {
			phone = callPhones.admin;
		} else {
			switch (userPerms) {
				default: {
					phone = callPhones.default;
					break;
				}

				case PermissionLevel.donator: {
					phone = callPhones.donator;
					break;
				}

				case PermissionLevel.maintainer:
				case PermissionLevel.customerSupport: {
					phone = callPhones.support;
					break;
				}

				case PermissionLevel.contributor: {
					phone = callPhones.contributor;
					break;
				}
			}
		}

		toSend.content += `** ${phone} `;
		toSend.content += message.content;

		if (message.attachments.size != 0) {
			for (const i of message.attachments.values()) {
				if (i.contentType?.startsWith("image/")) {
					toSend.embeds?.push({
						image: {
							url: i.url,
						},
					});
				} else {
					toSend.embeds?.push(this.client.warningEmbed("", {
						description: `File: **[${i.name}](${i.url})**`,
						footer: {
							text: t("commands.call.dontTrustStrangers"),
						},
					}));
				}
			}
		}

		const forwardedMessageID = await this.client.sendCrossShard(toSend, sideToSendTo.channelID);

		await this.client.db.callMessages.create({
			data: {
				callID: this.id,
				forwardedMessageID: forwardedMessageID.id,
				originalMessageID: message.id,
				sender: message.author.id,
				sentAt: new Date(),
			},
		});
	}

	async hangup(interaction: CommandInteraction): Promise<void> {
		const sideInitiatingHangup: CallSide = this.from.channelID === interaction.channelId ? "from" : "to";

		await db.calls.update({
			where: {
				id: this.id,
			},
			data: {
				active: false,
			},
		});

		this.client.calls.splice(this.client.calls.indexOf(this), 1);

		const baseEmbed: MessageEmbedOptions = t("commands.hangup.embeds.baseEmbed", {
			context: {
				callID: this.id,
				time: "",
			},
		});

		let thisSideDesc, otherSideDesc;
		if (this.pickedUp) {
			thisSideDesc = t("commands.hangup.descriptions.pickedUp.thisSide");
			otherSideDesc = t("commands.hangup.descriptions.pickedUp.otherSide");
		} else {
			thisSideDesc = t("commands.hangup.descriptions.notPickedUp.otherSide");
			otherSideDesc = t("commands.hangup.descriptions.notPickedUp.otherSide");
		}

		interaction.reply({
			embeds: [{
				...baseEmbed,
				description: thisSideDesc,
			}],
		});

		const otherSideChannelID = sideInitiatingHangup === "to" ? this.to.channelID : this.from.channelID;

		this.client.sendCrossShard({
			embeds: [{
				...baseEmbed,
				description: otherSideDesc,
			}],
		}, otherSideChannelID);
	}
}
