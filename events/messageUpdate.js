const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, oldMessage, newMessage) => {
	if (oldMessage.author.id === client.user.id) return;
	let perms = await permCheck(client, oldMessage.author.id);
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
	if (!callDocument) return;
	let editChannel;
	if (callDocument.to.channelID === oldMessage.channel.id) {
		editChannel = client.api.channels(callDocument.from.channelID);
	} else {
		editChannel = client.api.channels(callDocument.to.channelID);
	}
	let messageToEdit;
	try {
		messageToEdit = callDocument.messages.find(m => m.umessage === oldMessage.id);
		if (!messageToEdit) throw new Error();
	} catch (err) {
		newMessage.reply(`:x: Error! This should not have happened. An error occured in the "messageUpdate" event. \n \`\`\`js\n${err.stack}\`\`\``);
		console.log(`[Shard ${client.shard.id}] Error occured in the messageUpdate event.\n ${err.stack}`);
	}
	let toSend;
	if (perms.support) {
		toSend = `**${oldMessage.author.tag}** :arrow_right: :telephone_receiver: ${newMessage.content}`;
	} else if (perms.donator || oldMessage.author.id === `139836912335716352`) {
		toSend = `**${oldMessage.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${newMessage.content}`;
	} else {
		toSend = `**${oldMessage.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${newMessage.content}`;
	}
	try {
		await editChannel.messages(messageToEdit.bmessage).patch(MessageBuilder({
			content: toSend,
		}));
	} catch (err) {
		await client.api.channels(editChannel.id).messages.post(MessageBuilder({
			content: `[EDITED]: ${toSend}`,
		}));
	}
};
