module.exports = async(client, message, callDocument) => {
	console.log("call handler start")
	const support = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	const donators = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.DONATORROLE).members.has(user_id);
	let sendChannel;
	if (message.channel.id === callDocument.to.channelID) {
		sendChannel = client.channels.get(callDocument.from.channelID);
	} else if (message.channel.id === callDocument.from.channelID) {
		sendChannel = client.channels.get(callDocument.to.channelID);
	} else {
		message.reply("Error! Please contact a bot developer.");
	}
	if (support(message.author.id)) {
		sendChannel.send(`**${message.author.tag}** :arrow_right: :telephone_receiver: ${message.content}`);
	} else if (donators(message.author.id)) {
		sendChannel.send(`**${message.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${message.content}`);
	} else {
		sendChannel.send(`**${message.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${message.content}`);
	}
};
