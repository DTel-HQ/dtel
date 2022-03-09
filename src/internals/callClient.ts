import { CallParticipant, DTelCall, DTelMessage } from "../database/schemas/call";
import { DTelNumber } from "../database/schemas/number";
import DTelClient from "./client";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { Message, MessageActionRow, MessageButton, MessageComponentInteraction, ShardClientUtil, TextBasedChannel } from "discord.js";

interface CallOptions {
	from: DTelNumber,
	to: string,
	random: boolean,
	startedBy: string,
	vip?: {
		expiry: Date,
		hiddenNumberDisplay: boolean,
		customCallerDisplay: string
	}
}

interface ClientCallParticipant extends CallParticipant {
	dbNumber: DTelNumber,
	locale: string,
}

export default class CallClient implements DTelCall {
	primary = false;

	_id: string = uuidv4();
	to: ClientCallParticipant = {
		dbNumber: undefined,
		locale: undefined,
		number: undefined,
		channelID: undefined,
		isVip: undefined,
	};
	from: ClientCallParticipant;
	pickedUp: { at: Date; by: string; };
	randomCall: boolean;
	started: { at: Date; by: string; };
	messages: [DTelMessage];

	otherSideShardID: number;

	client: DTelClient;

	constructor(client: DTelClient, options?: CallOptions, dbCallDoc?: DTelCall) {
		this.client = client;

		if (dbCallDoc) {
			Object.assign(this, dbCallDoc);
			return;
		}

		this.from = {
			dbNumber: options.from, // A number object from the database

			number: options.from._id,
			locale: options.from.locale,
			channelID: options.from.channelID,
			isVip: options.from.vip?.expiry > new Date(),
		};

		this.to.number = options.to;

		this.randomCall = options.random;
		this.started = {
			by: options.startedBy,
			at: new Date(),
		};
	}

	static async byID(client: DTelClient, id: string): Promise<CallClient> {
		const call = await client.db.calls.findById(id).exec() as DTelCall;
		if (!call) throw new Error(t("callNotFound"));

		const callManager = new CallClient(client, null, call);
		callManager.primary = false;
		callManager.otherSideShardID = await client.shardIdForChannelId(call.from.channelID);

		client.calls.push(callManager);

		return callManager;
	}

	async initiate(): Promise<void> {
		this.primary = true;

		if (this.from.dbNumber.expiry < new Date()) throw new Error("thisSideExpired");

		let numberToDial = this.client.parseNumber(this.to.number);
		if (numberToDial == "*611") numberToDial = "08007877678";

		if (numberToDial.length != 11) throw new Error("numberInvalid");

		const numberFromDB = await this.client.db.numbers.findById(numberToDial).exec() as DTelNumber;

		// Preflight checks
		if (!numberFromDB) throw new Error("numberNotFound");
		if (numberFromDB.expiry < new Date()) throw new Error("otherSideExpired");
		if (numberFromDB.blocked.includes(this.from.number)) throw new Error("otherSideBlockedYou");

		this.to = {
			dbNumber: numberFromDB,

			number: numberToDial,
			locale: numberFromDB.locale,
			channelID: numberFromDB.channelID,
			isVip: numberFromDB.vip?.expiry > new Date(),
		};

		// TODO: Check for pre-existing calls and do embed stuff
		// and that includes stuff like call-waiting

		await this.client.db.calls.create(this as DTelCall);
		this.client.calls.push(this);

		// Don't bother sending it if we can find it on this shard
		try {
			await this.client.channels.fetch(this.to.channelID);
			throw new Error();
		} catch {
			// Send the call to another shard if required
			// This is probably the best way to do it as it tells us if it was successful

			this.otherSideShardID = await this.client.shardIdForChannelId(this.to.channelID);

			if (!this.otherSideShardID) {
				this.client.db.calls.deleteOne({ _id: this._id }).exec().catch(() => null);
				throw new Error("numberMissingChannel");
			}

			// THIS CAN THROW callNotFound
			await this.client.shard.broadcastEval(async(client: DTelClient, context): Promise<void> => {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				client.calls.push(await require(`${context.dirname}/../internals/callClient`).default.byID(client, context.callID));
			}, {
				shard: this.otherSideShardID,
				context: {
					callID: this._id,
					dirname: __dirname,
				},
			});
		}

		let fromCallerDisplay = this.from.number;
		if (this.from.isVip) {
			if (this.from.dbNumber.vip?.customCallerDisplay) fromCallerDisplay = this.from.dbNumber.vip?.customCallerDisplay;
			else if (this.from.dbNumber.vip?.hiddenNumberDisplay) fromCallerDisplay = "Hidden";
		}

		this.client.sendCrossShard({
			embeds: [{
				color: this.client.config.colors.info,

				...t("commands.call.incomingCall", {
					lng: this.to.locale,
					number: fromCallerDisplay,
					callID: this._id,
				}),
			}],
			components: [
				new MessageActionRow()
					.addComponents([
						new MessageButton({
							customId: "call-pickup",
							label: t("commands.call.pickup"),
							style: "PRIMARY",
							emoji: "📞",
						}),
					])
					.addComponents([
						new MessageButton({
							customId: "call-hangup",
							label: t("commands.call.hangup"),
							style: "SECONDARY",
							emoji: "☎️",
						}),
					]),
			],
		}, this.to.channelID);
	}

	async pickup(interaction: MessageComponentInteraction, pickedUpBy: string): Promise<void> {
		this.pickedUp = {
			at: new Date(),
			by: pickedUpBy,
		};

		if (this.otherSideShardID) {
			await this.client.shard.broadcastEval(async(client: DTelClient, context): Promise<void> => {
				const callHandler = client.calls.find(c => c._id === context.callID);
				callHandler.pickedUp = {
					at: new Date(context.pickedUp.at),
					by: context.pickedUp.by,
				};
			}, {
				shard: this.otherSideShardID,
				context: {
					callID: this._id,
					pickedUp: this.pickedUp,
				},
			});
		}

		this.client.db.calls.updateOne({ _id: this._id }, { pickedUp: this.pickedUp }).exec();

		interaction.reply({
			embeds: [{
				color: this.client.config.colors.success,

				...t("commands.call.thisSidePickedUp", {
					lng: this.to.locale,
					callID: this._id,
				}),
			}],
		});

		this.client.sendCrossShard({
			embeds: [{
				color: this.client.config.colors.success,

				...t("commands.call.otherSidePickedUp", {
					lng: this.to.locale,
					callID: this._id,
				}),
			}],
		}, this.from.channelID);
	}

	async handleMessage(message: Message): Promise<void> {
		const sideToSendTo = this.primary ? this.to.channelID : this.from.channelID;

		let toSend = `**${message.author.tag}**`;

		// TODO: images, permission based phones, 611 ids

		toSend += "📞 ";
		toSend += message.content;

		this.client.sendCrossShard({
			content: toSend,
		}, sideToSendTo);
	}
}
