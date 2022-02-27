import { MessageEmbedOptions } from "discord.js";
import { Schema } from "mongoose";
const { Types } = Schema;

export interface DTelNumber {
	_id: string, // Actual number
	channelID: string,
	blocked: string[],
	contacts: string[],
	expiry: Date,
	promote: Promote,
	vip: {
		expiry: Date,
		hiddenNumberDisplay: boolean,
		customCallerDisplay: string,
	},
	waiting: boolean,
}

interface Promote {
	embed: MessageEmbedOptions,
	lastEdited: Date,
	lastPromoted: Date,
	lastMsg: string,
	lastUsr: Date,
}

const schema = new Schema<DTelNumber>({
	_id: {
		type: String,
	},
	channelID: {
		type: String,
		required: true,
		tags: { type: String, index: true, unique: true },
	},
	blocked: [{
		type: [String],
	}],
	contacts: [{
		default: [],
		type: Array,
	}],
	expiry: {
		type: Date,
		required: true,
	},
	promote: {
		embed: Types.Mixed,
		lastEdited: Date,
		lastPromoted: Date,
		lastMsg: String,
		lastUsr: Date,
	},
	vip: {
		expiry: Date,
		hidden: Boolean,
		name: String,
	},
	waiting: Boolean,
});

export default schema;
