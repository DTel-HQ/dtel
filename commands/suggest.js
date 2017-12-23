module.exports = async(bot, message, args) => {
	if (args === undefined) {
		message.reply(":x: Usage: `>suggest <suggestion>`");
		return;
	}
	message.reply("Thanks for your suggestion!");
	bot.channels.get("326798754348793857").send(`New suggestion from __${message.author.username}#${message.author.discriminator}__ (${message.author.id}) \`\`\`\n${message.content.split(" ").splice(1).join(" ")
		.split("```")
		.join(" ")}\`\`\``);
};
