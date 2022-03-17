import { Schema } from "mongoose";

export interface CallParticipant {
	number: string,
	channelID: string,
	isVip: boolean,
}

export interface DTelCall {
	_id: string, // Call ID
	to: CallParticipant, // Number receiving the call
	from: CallParticipant, // Number starting the call
	pickedUp: {
		at: Date, // Time the call was picked up
		by: string, // User ID of person who answered call
	},
	randomCall: boolean, // Whether or not the call was initiated by /rcall
	started: {
		at: Date, // Time the call was started at
		by: string, // User ID of person who started the call
	},
}

const toOrfrom = { // For codacy
	number: {
		type: String,
		required: true,
		unique: true,
	},
	channelID: {
		type: String,
		required: true,
		unique: true,
	},
	isVip: {
		type: Boolean,
		default: false,
	},
};

const schema = new Schema<DTelCall>({
	_id: {
		type: String,
	},
	to: toOrfrom,
	from: toOrfrom,
	pickedUp: {
		at: Date,
		by: String,
	},
	randomCall: {
		type: Boolean,
	},
	started: {
		at: {
			type: Date,
			default: Date.now,
		},
		by: {
			type: String,
			required: true,
		},
	},
});

export default schema;
