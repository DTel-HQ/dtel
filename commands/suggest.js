module.exports = async(bot, message, args) => {
	//Creates a new set
	const SuggestedRecently = new Set();
	//Removes user from the set after 2 hours
	setTimeout(() => {
		SuggestedRecently.delete(message.author.id)
	}, 7200000);
	
	//Prevents user from suggesting again
	if(SuggestedRecently.has(message.author.id) return; //You can add a message, but I'll just put it as return
	   
	if (args === undefined) {
		message.reply(":x: Usage: `>suggest <suggestion>`");
		return;
	}
	
	//Adds user to the set
	SuggestedRecently.add(message.author.id);
	
	message.reply("Thanks for your suggestion!");
	bot.channels.get("326798754348793857").send(`:new: New suggestion from __${message.author.username}#${message.author.discriminator}__ (${message.author.id}) \`\`\`\n${message.content.split(" ").splice(1).join(" ")
		.split("```")
		.join(" ")}\`\`\``);
};
