import { Schema } from "mongoose";

export interface CallParticipant {
	number: string,
	channelID: string,
	hiddenNumberDisplay: boolean,
	isVip: boolean,
	customCallerDisplay: string
}

export interface DTelMessage {
	forwardedMessageID: string, // The ID of the message the bot sent to the other side,
	originalMessageID: string, // The ID of the original message sent by the original user
	sentAt: Date, // Time the message was sent by the user
	sender: string, // ID of person who sent the original message
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

	messages: [DTelMessage]
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
	hiddenNumberDisplay: {
		type: Boolean,
		default: false,
	},
	isVip: {
		type: Boolean,
		default: false,
	},
	customCallerDisplay: {
		type: String,
		required: true,
	},
};

const schema = new Schema<DTelCall>({
	// We'll use the default mongodb _id as a call unique identifier
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

	messages: [{
		forwardedMessageID: String,
		originalMessageID: String,
		sentAt: Date,
		sender: String,
	}],
});

export default schema;
