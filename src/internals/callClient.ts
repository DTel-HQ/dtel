import { CallParticipant, DTelCall, DTelMessage } from "../database/schemas/call";
import { DTelNumber } from "../database/schemas/number";
import DTelClient from "./client";

interface CallOptions {
	from: DTelNumber & {
		locale: string,
	},
	to: string,
	random: boolean,
	startedBy: string,
	client: DTelClient,
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
	_id: string;
	to: ClientCallParticipant;
	from: ClientCallParticipant;
	pickedUp: { at: Date; by: string; };
	randomCall: boolean;
	started: { at: Date; by: string; };
	messages: [DTelMessage];

	client: DTelClient;

	constructor(options: CallOptions) {
		this.client = options.client;

		this.from = {
			dbNumber: options.from,

			number: options.from._id,
			locale: options.from.locale,
			channelID: options.from.channelID,
			isVip: (options.from.vip ? options.from.vip.expiry : new Date()) > new Date(),
			hiddenNumberDisplay: (options.from.vip ? options.from.vip.hiddenNumberDisplay : false),
			customCallerDisplay: (options.from.vip ? options.from.vip.customCallerDisplay : ""),
		};
                
                this.to = {
                    dbNumber: undefined,//this.client.db.numbers.findById(options.to),
                    locale: undefined,
                    number: undefined,
                    channelID: undefined,//this.to.dbNumber.channelID,
                    hiddenNumberDisplay: undefined,
                    isVip: undefined,
                    customCallerDisplay: undefined,
                };

                /*(async()=>{
                    this.to.dbNumber = await this.client.db.numbers.findById(options.to);
                    this.to.number = this.to.dbNumber._id;
                    this.to.channelID = this.to.dbNumber.channelID;
                })()*/
		this.to.number = options.to;

		this.randomCall = options.random;
		this.started = {
                    by: options.startedBy,
                    at: new Date()
                }
                //.by = options.startedBy;
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
			locale: "en-GB", // To be filled in later by message buttons for picking up calls
			channelID: numberFromDB.channelID,
			isVip: numberFromDB.vip.expiry > new Date(),
			hiddenNumberDisplay: numberFromDB.vip.hiddenNumberDisplay,
			customCallerDisplay: numberFromDB.vip.customCallerDisplay,
		};
	}
}
