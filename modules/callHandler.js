const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, callDocument) => {
	let perms = await client.permCheck(message.author.id);
	let sendChannel;
	if (message.channel.id === callDocument.to.channelID) {
		sendChannel = callDocument.from.channelID;
	} else if (message.channel.id === callDocument.from.channelID) {
		sendChannel = callDocument.to.channelID;
	} else {
		message.reply("Error! Please contact a bot developer.");
	}
	message.content = message.content.replace(/@(everyone|here)/g, `@­$1`);
	let sent;
	if (perms.donator || message.author.id === `139836912335716352`) {
		sent = await client.apiSend(`**${message.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${message.content}`, sendChannel);
	} else if (perms.support) {
		sent = await client.apiSend(`**${message.author.tag}** :arrow_right: :telephone_receiver: ${message.content}`, sendChannel);
	} else {
		sent = await client.apiSend(`**${message.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${message.content}`, sendChannel);
	}
	callDocument.messages.push({
		bmessage: sent.id,
		umessage: message.id,
		creator: message.author.id,
	});
	await callDocument.save();
};
