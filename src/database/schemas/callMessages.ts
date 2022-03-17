import { Schema } from "mongoose";

export interface DTelCallMessage {
	// No obvious _id field here
	callID: string,
	forwardedMessageID: string, // The ID of the message the bot sent to the other side,
	originalMessageID: string, // The ID of the original message sent by the original user
	sentAt: Date, // Time the message was sent by the user
	sender: string, // ID of person who sent the original message
}

const schema = new Schema({
	callID: {
		type: String,
		tags: { type: String, index: true, unique: false },
	},
	forwardedMessageID: String,
	originalMessageID: String,
	sentAt: Date,
	sender: String,
});

export default schema;
