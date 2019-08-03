const { MessageEmbed } = require("discord.js");
module.exports = async(client, msg, suffix) => {
	let callID = suffix.split(" ")[0];
	let msgID = suffix.split(" ")[1];
	if (!callID || !msgID) return msg.channel.send({ embed: { color: 0x000066, title: "Command usage", description: ">identify [Call/Message ID] [Message/Call ID]\nReturns with the user ID of the sender." } });
	// Flip the values to make it CS-proof
	if (msgID.length > callID.length) [msgID, callID] = [callID, msgID];

	let call = await r.table("OldCalls").get(callID);
	if (!call) call = Calls.get(callID);
	if (!call) return msg.channel.send({ embed: { color: 0x660000, title: "Call not found", description: "Check if you have the right call ID." } });

	if (!call.messages) return msg.channel.send({ embed: { color: 0x660000, title: "No messages", description: "This call does not contain any messages." } });
	let msgDoc = await call.messages.find(m => m.dtelmsg == msgID);
	if (!msgDoc) return msg.channel.send({ embed: { color: 0x660000, title: "Message not found", description: "Couldn't find that message in the call.\nMake sure the message comes from DTel." } });
	return msg.channel.send({ embed: { color: 0x006600, title: "Message found!", description: `User: <@${msgDoc.user}>(${msgDoc.user})` } });
};
