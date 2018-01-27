const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, message, callDocument) => {
	let perms = await permCheck(client, message.author.id);
	let sendChannel;
	if (message.channel.id === callDocument.to.channelID) {
		sendChannel = callDocument.from.channelID;
	} else if (message.channel.id === callDocument.from.channelID) {
		sendChannel = callDocument.to.channelID;
	} else {
		message.reply("Error! Please contact a bot developer.");
	}
	message.content = message.content.replace(/@(everyone|here)/g, `@­$1`);
	let send = content => client.api.channels(sendChannel).messages.post(MessageBuilder({
		content,
	}));
	let sent;
	if (perms.support) {
		sent = await send(`**${message.author.tag}** :arrow_right: :telephone_receiver: ${message.content}`);
	} else if (perms.donator || message.author.id === `139836912335716352`) {
		sent = await send(`**${message.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${message.content}`);
	} else {
		sent = await send(`**${message.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${message.content}`);
	}
	callDocument.messages.push({
		bmessage: sent.id,
		umessage: message.id,
		creator: message.author.id,
	});
	await callDocument.save();
};
