const { MessageEmbed } = require("discord.js");
module.exports = async(client, msg, suffix) => {
	let callID = suffix.split(" ")[0];
	let msgID = suffix.split(" ")[1];
	if (!callID || !msgID) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">identify [Call/Message ID] [Message/Call ID]\nReturns information about the user and past messages if it was edited." } });
	// Flip the values to make it CS-proof
	if (msgID.length > callID.length) [msgID, callID] = [callID, msgID];

	let call = await r.table("OldCalls").get(callID);
	if (!call) call = r.table("Calls").get(callID);
	if (!call) return msg.channel.send({ embed: { color: config.colors.error, title: "Call not found", description: "Check if you have the right call ID." } });

	if (!call.messages) return msg.channel.send({ embed: { color: config.colors.error, title: "No messages", description: "This call does not contain any messages." } });
	let msgDoc = await call.messages.find(m => m.dtelmsg == msgID);
	if (!msgDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Message not found", description: "Couldn't find that message in the call.\nMake sure the message comes from DTel." } });

	let embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Message found!")
		.addField(`Details`, `**User:** <@${msgDoc.user}> (${msgDoc.user})\n**Message:** ${msgDoc.msg}`)
		.setFooter(msg.author.tag, msg.author.displayAvatarURL());

	if (call.edits && call.edits[msgDoc.umsg]) embed.addField("Edits", call.edits[msgDoc.umsg].map(edit => `**Message:** ${edit.msg}\n**Edited at:** ${edit.time}\n\n`));

	msg.channel.send({ embed: embed });
};
