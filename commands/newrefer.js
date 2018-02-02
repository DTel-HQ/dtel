module.exports = async(client, message, args) => {
	if (!args) {
		return message.channel.send({
			embed: {
				color: 3447003,
				title: "DiscordTel Referral Program",
				description: "To expand DiscordTel's services, I invite you to refer new users into DiscordTel.",
				fields: [{
					name: "Oooh, how do I do it?",
					value: `It's easy. Ask server owners you've invited to type \`>refer ${message.author.id}\`.`,
				},
				{
					name: "What do I get?",
					value: "For every referral you've invited, 100 credits will be paid to you and your referral.",
				},
				{
					name: "Can I cheat?",
					value: "*smug* No, sweetheart. You'll understand why.",
				}],
			},
		});
	}
	let user;
	try {
		user = await client.users.fetch(args)
		if (!user) throw new Error();
	} catch (err) {
		return message.reply("DiscordTel can not reach the referral. Try someone else.");
	}
	if (message.guild.owner.id !== message.author.id) {
		return message.reply("Only server owners can refer people.");
	} else if (message.auhtor.id === args) {
		message.reply("You can't refer yourself :b:");
	} else if (client.api)
};
