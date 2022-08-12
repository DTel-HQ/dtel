import DTelClient from "./client";
import { getFixedT, TFunction } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { ActionRowBuilder, ButtonBuilder, Client, CommandInteraction, Message, MessageComponentInteraction, MessageOptions, PermissionsBitField, Typing } from "discord.js";
import { PermissionLevel } from "../interfaces/commandData";
import { Calls, Numbers, atAndBy } from "@prisma/client";
import { db } from "../database/db";
import config from "../config/config";
import { APIEmbed, APIMessage, ButtonStyle, RESTGetAPIChannelMessageResult } from "discord-api-types/v10";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { parseNumber } from "./utils";
import { NumbersWithGuilds } from "../interfaces/numbersWithGuilds";

dayjs.extend(relativeTime);

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

type CallsWithNumbers = Calls & {
	to: Numbers,
	from: Numbers,
};

interface ClientCallParticipant extends NumbersWithGuilds {
	locale: string,
	t: TFunction,
}

type CallsWithNumbersAndGuilds = Calls & {
	to: NumbersWithGuilds,
	from: NumbersWithGuilds,
};


export { CallsWithNumbers };

export default class CallClient implements CallsWithNumbers {
	primary = false;

	id: string = uuidv4();
	toNum = "";
	fromNum = "";
	to!: ClientCallParticipant;
	from!: ClientCallParticipant;
	pickedUp: atAndBy | null = null;
	randomCall = false;
	started!: { at: Date, by: string };
	ended: atAndBy | null = null;
	active = true;

	otherSideShardID = 0;

	client: DTelClient;

	constructor(client: DTelClient, options?: CallOptions, dbCallDoc?: Calls) {
		this.client = client;

		if (dbCallDoc) {
			Object.assign(this, dbCallDoc);

			if (!this.pickedUp?.by) this.setupPickupTimer();

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

	static async byID(client: DTelClient, options: { id?: string, doc?: callMissingChannel | null, side: CallSide }): Promise<CallClient> {
		if (!options.doc) {
			options.doc = await client.db.calls.findUnique({
				where: {
					id: options.id,
				},
				include: {
					to: {
						include: {
							guild: true,
						},
					},
					from: {
						include: {
							guild: true,
						},
					},
				},
			});
		}

		if (!options.doc) {
			throw new Error("Call not found or not provided");
		}

		if (!options.doc.to || !options.doc.from) {
			await CallClient.prematureEnd(options.doc);
		}

		// Preflight checks done, we are sure there's a call and that we know about both number
		const callDoc = options.doc as CallsWithNumbersAndGuilds;

		const callManager = new CallClient(client, undefined, callDoc);
		callManager.primary = options.side === "from";
		callManager.otherSideShardID = await client.shardIdForChannelId(options.side === "from" ? callDoc.to.channelID : callDoc.from.channelID);


		const toLocale = callDoc.to.guild?.locale || "en-US";
		const fromLocale = callDoc.from.guild?.locale || "en-US";

		callManager.to.t = getFixedT(toLocale, undefined, "commands.call");
		callManager.from.t = getFixedT(fromLocale, undefined, "commands.call");

		callManager.to.locale = toLocale;
		callManager.from.locale = fromLocale;

		return callManager;
	}

	get timeElapsed(): string {
		return dayjs(this.started.at).fromNow(true);
	}

	toSend(payload: MessageOptions): Promise<APIMessage> {
		return this.client.sendCrossShard(payload, this.to.channelID);
	}
	fromSend(payload: MessageOptions): Promise<APIMessage> {
		return this.client.sendCrossShard(payload, this.from.channelID);
	}

	async initiate(): Promise<void> {
		this.primary = true;

		// Get the number in the correct format for DB query (all numbers)
		this.toNum = parseNumber(this.toNum);
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
				incomingCalls: {
					where: {
						active: true,
					},
				},
				outgoingCalls: {
					where: {
						active: true,
					},
				},
				guild: true,
			},
		});


		const fromNumber = participants.find(p => p.number === this.fromNum);
		if (!fromNumber) throw new Error("invalidFrom");
		this.from = {
			...fromNumber,

			locale: fromNumber.guild?.locale || "en-US",
			t: getFixedT(fromNumber.guild?.locale || "en-US", undefined, "commands.call"),
		};

		if (this.from.expiry < new Date()) throw new Error("thisSideExpired");

		const toNumber = participants.find(p => p.number === this.toNum);

		// Preflight checks
		if (!toNumber) throw new Error("otherSideNotFound");
		if (toNumber.expiry < new Date()) throw new Error("otherSideExpired");
		if (toNumber.blocked.includes(this.from.number)) throw new Error("otherSideBlockedYou");

		if (toNumber.incomingCalls.length > 0 || toNumber.outgoingCalls.length > 0) {
			throw new Error("otherSideInCall");
		}

		this.to = {
			...toNumber,

			locale: toNumber.guild?.locale || "en-US",
			t: getFixedT(toNumber.guild?.locale || "en-US", undefined, "commands.call"),
		};

		// TODO: Check for pre-existing calls and do embed stuff
		// and that includes stuff like call-waiting

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

		let notificationMessageID: string;
		try {
			notificationMessageID = (await this.toSend({
				embeds: [{
					color: this.client.config.colors.info,

					...(this.to.t("incomingCall", {
						number: fromCallerDisplay,
						callID: this.id,
					}) as APIEmbed),
				}],
				components: [
					new ActionRowBuilder<ButtonBuilder>()
						.addComponents([
							new ButtonBuilder({
								customId: "call-pickup",
								label: this.to.t("pickup")!,
								style: ButtonStyle.Primary,
								emoji: "📞",
							}),
							new ButtonBuilder({
								customId: "call-hangup",
								label: this.to.t("hangup")!,
								style: ButtonStyle.Secondary,
								emoji: "☎️",
							}),
						]),
				],
			})).id;
		} catch (err: unknown) {
			this.fromSend({
				embeds: [
					this.client.errorEmbed(this.from.t("errors.couldntReachOtherSide")),
				],
			});

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
			},
		});
		this.client.calls.push(this);

		if (!this.primary || config.shardCount == 1) this.setupPickupTimer(notificationMessageID);
	}


	async setupPickupTimer(callNotifMsgID?: string): Promise<void> {
		setTimeout(async() => {
			if (this.pickedUp?.by) return;

			try {
				if (callNotifMsgID) {
					const callMsg = await this.client.rest.get(`/channels/${this.to.channelID}/messages/${callNotifMsgID}`) as RESTGetAPIChannelMessageResult;
					await this.client.editCrossShard({
						embeds: callMsg.embeds,
						components: [],
					}, this.to.channelID, callNotifMsgID);
				}

				// TODO: Mailbox


				this.fromSend({
					embeds: [this.to.t("missedCall.fromSide") as APIEmbed],
				});
				this.toSend({
					embeds: [this.to.t("missedCall.toSide") as APIEmbed],
				});
			} catch {
				// Ignore
			}

			this.endHandler();
		}, 2 * 60 * 1000);
	}

	async pickup(interaction: MessageComponentInteraction): Promise<void> {
		this.pickedUp = {
			at: new Date(),
			by: interaction.user.id,
		};

		await this.client.editCrossShard({
			embeds: interaction.message.embeds,
			components: [],
		}, interaction.channelId, interaction.message.id).catch(() => null);


		if (this.otherSideShardID) {
			type ctx = { callID: string, pickedUp: atAndBy };
			await this.client.shard?.broadcastEval<void, ctx>(async(_client, context): Promise<void> => {
				const client = _client as DTelClient;
				const callHandler = client.calls.find(c => c.id === context.callID);
				if (!callHandler) throw new Error("No handler");

				callHandler.pickedUp = {
					at: new Date(context.pickedUp.at),
					by: context.pickedUp.by,
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

				...(this.from.t("pickedUp.toSide", {
					lng: this.to.locale,
					callID: this.id,
				}) as APIEmbed),
			}],
		});

		this.fromSend({
			embeds: [{
				color: this.client.config.colors.success,

				...(this.to.t("pickedUp.fromSide", {
					callID: this.id,
				}) as APIEmbed),
			}],
		});
	}

	async handleMessage(message: Message): Promise<void> {
		if (!this.pickedUp?.by) return;

		const userPerms = await this.client.getPerms(message.author.id);
		const sideToSendTo = this.from.channelID === message.channel.id ? this.to : this.from;

		const toSend: MessageOptions = { content: `**${message.author.tag}`, embeds: [] };

		if (sideToSendTo.number === this.client.config.supportGuild.supportNumber) {
			toSend.content += `(${message.author.id})`;
		}

		const { callPhones } = this.client.config;
		let phone = "";

		if (userPerms < PermissionLevel.customerSupport && message.member?.permissions?.has(PermissionsBitField.Flags.ManageGuild)) {
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
							text: sideToSendTo.t("dontTrustStrangers"),
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

	async hangup(interaction: CommandInteraction|MessageComponentInteraction): Promise<void> {
		const sideInitiatingHangup: CallSide = this.from.channelID === interaction.channelId ? "from" : "to";
		const thisSide = sideInitiatingHangup === "from" ? this.from : this.to;
		const otherSide = thisSide === this.from ? this.to : this.from;

		const thisSideT = getFixedT(thisSide.locale, undefined, "commands.hangup");
		const otherSideT = getFixedT(otherSide.locale, undefined, "commands.hangup");

		this.client.calls.splice(this.client.calls.indexOf(this), 1);

		const callLength = this.timeElapsed;

		let thisSideDesc: string, otherSideDesc: string;
		if (this.pickedUp) {
			thisSideDesc = thisSideT("descriptions.pickedUp.thisSide", { time: callLength });
			otherSideDesc = otherSideT("descriptions.pickedUp.otherSide", { time: callLength });
		} else {
			thisSideDesc = thisSideT("descriptions.notPickedUp.otherSide", { time: callLength });
			otherSideDesc = otherSideT("descriptions.notPickedUp.otherSide", { time: callLength });
		}


		interaction.reply({
			embeds: [{
				...(thisSideT("baseEmbed", {
					callID: this.id,
				}) as APIEmbed),
				description: thisSideDesc,
			}],
		});

		this.client.sendCrossShard({
			embeds: [{
				...(otherSideT("baseEmbed", {
					callID: this.id,
					time: callLength,
				}) as APIEmbed),
				description: otherSideDesc,
			}],
		}, otherSide.channelID);

		this.endHandler(interaction.user.id);
	}

	async typingStart(typing: Typing): Promise<void> {
		// Get other side
		const otherSide = typing.channel.id === this.from.channelID ? this.to.channelID : this.from.channelID;

		this.client.rest.post(`/channels/${otherSide}/typing`).catch(() => null);
	}

	async countMessages(): Promise<number> {
		return (await db.callMessages.aggregate({
			where: {
				callID: this.id,
			},
			_count: {
				_all: true,
			},
		}))._count._all;
	}

	async endHandler(endedBy = ""): Promise<void> {
		return CallClient.endHandler(this.id, endedBy);
	}

	static async endHandler(id: string, endedBy = ""): Promise<void> {
		db.calls.update({
			where: {
				id: id,
			},
			data: {
				active: false,
				ended: {
					at: new Date(),
					by: endedBy ? endedBy : "system",
				},
			},
		}).catch(() => null);
	}

	static async prematureEnd(callDoc: callMissingChannel): Promise<void> {
		CallClient.endHandler(callDoc.id, "system - number lost");
	}
}

type callMissingChannel = Calls & { to: Numbers | null, from: Numbers | null};
