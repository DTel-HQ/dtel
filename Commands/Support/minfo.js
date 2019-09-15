const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();

	let number = suffix.split(" ")[0];
	let id = suffix.split(" ")[1];
	if (!number || !id) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >minfo [Number or Channel] [Message ID]" } });

	let myNumber = await r.table("Numbers").get(number);
	if (!myNumber) myNumber = (await r.table("Numbers").filter({ channel: number }))[0];
	if (!myNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "Couldn't find that number!" } });

	let mailbox = await r.table("Mailbox").get(myNumber.channel);
	if (!mailbox) return msg.channel.send({ embed: { color: config.colors.error, title: "No mailbox", description: "This number doesn't have a mailbox." } });

	let message = mailbox.messages.filter(m => m.id === id)[0];
	if (!message) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid mailbox", description: "Couldn't find that message" } });

	const embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle(`Message information for ${id}`)
		.setDescription("Find out who sent that message!")
		.addField("Message", message.message)
		.addField("Author", message.user, true)
		.addField("From", message.number, true)
		.addField("At", new Date(message.time))
		.setFooter(`Requested by: ${msg.author.id}`);

	return msg.channel.send({ embed: embed });
};
