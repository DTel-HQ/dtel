const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, callDocument) => {
	const support = async user => {
		try {
			const member = await client.api.guilds(process.env.SUPPORTGUILD).members(user).get();
			if (member.roles.includes(process.env.SUPPORTROLE)) return true;
			return false;
		} catch (err) {
			console.log(err);
			return false;
		}
	};
	const donators = async user => {
		try {
			const member = await client.api.guilds(process.env.SUPPORTGUILD).members(user).get();
			if (member.roles.includes(process.env.DONATORROLE)) return true;
			return false;
		} catch (err) {
			console.log(err);
			return false;
		}
	};
	let sendChannel;
	if (message.channel.id === callDocument.to.channelID) {
		sendChannel = callDocument.from.channelID;
	} else if (message.channel.id === callDocument.from.channelID) {
		sendChannel = callDocument.to.channelID;
	} else {
		message.reply("Error! Please contact a bot developer.");
	}
	let send = content => client.channels(sendChannel).messages.post(MessageBuilder({
		content,
	}));
	if (support(message.author.id)) {
		send(`**${message.author.tag}** :arrow_right: :telephone_receiver: ${message.content}`);
	} else if (donators(message.author.id) || message.author.id === `139836912335716352`) {
		send(`**${message.author.tag}** :arrow_right: <:GoldPhone:320768431307882497> ${message.content}`);
	} else {
		send(`**${message.author.tag}** :arrow_right: <:DiscordTelPhone:310817969498226718> ${message.content}`);
	}
};
