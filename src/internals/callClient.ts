import { CallParticipant, DTelCall, DTelMessage } from "../database/schemas/call";
import { DTelNumber } from "../database/schemas/number";
import DTelClient from "./client";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { MessageActionRow, MessageButton } from "discord.js";

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

	client: DTelClient;

	constructor(client: DTelClient, options?: CallOptions, callDoc?: DTelCall) {
		this.client = client;

		if (callDoc) {
			Object.assign(this, callDoc);
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

	async initiate(): Promise<void> {
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

		this.client.db.calls.create(this as DTelCall);
		this.client.calls.push(this);

		// Don't bother sending it if we can find it on this shard
		try {
			await this.client.channels.fetch(this.to.channelID);
			throw new Error();
		} catch {
			this.client.shard.send({
				msg: "callInitiated",
				callDBObject: JSON.stringify(this as DTelCall, (key, value) => key === "client" ? undefined : value),
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

	async pickup(pickedUpBy: string): Promise<void> {
		this.pickedUp = {
			at: new Date(),
			by: pickedUpBy,
		}


	}
}
