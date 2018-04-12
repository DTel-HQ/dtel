const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, oldMessage, newMessage) => {
	if (oldMessage.author.id === client.user.id) return;
	let perms = await client.permCheck(oldMessage.author.id);
	let callDocument;
	try {
		callDocument = await Calls.findOne({ "to.channelID": oldMessage.channel.id });
		if (!callDocument) throw new Error();
	} catch (err) {
		try {
			callDocument = await Calls.findOne({ "from.channelID": oldMessage.channel.id });
			if (!callDocument) throw new Error();
		} catch (err2) {
			return;
		}
	}
	if (!callDocument && callDocument.pickedUp === false) return;
	let editChannel;
	if (callDocument.to.channelID === oldMessage.channel.id) {
		editChannel = callDocument.from.channelID;
	} else {
		editChannel = callDocument.to.channelID;
	}
	if (newMessage === "") return;
	let messageToEdit;
	try {
		messageToEdit = callDocument.messages.find(m => m.umessage === oldMessage.id);
		if (!messageToEdit) throw new Error();
	} catch (err) {
		// Ignore
		// console.log(`[Shard ${client.shard.id}] Error occured in the messageUpdate event.\n ${err.stack}`);
	}
	let toSend;
	if (perms.donator || oldMessage.author.id === `139836912335716352`) {
		toSend = `**${oldMessage.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${newMessage.content}`;
	} else if (perms.support) {
		toSend = `**${oldMessage.author.tag}** :arrow_right: :telephone_receiver: ${newMessage.content}`;
	} else {
		toSend = `**${oldMessage.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${newMessage.content}`;
	}
	try {
		client.apiEdit(toSend, editChannel, messageToEdit.bmessage);
	} catch (err) {
		await client.apiSend(`[EDITED]: ${toSend}`, editChannel);
	}
};
