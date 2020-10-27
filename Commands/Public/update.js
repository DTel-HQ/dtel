module.exports = async(client, msg, suffix) => {
	if (suffix === "info") return msg.channel.send({ embed: { color: config.colors.info, description: "update a user their perms\n`>update [userID]`" } });
	if (!suffix) suffix = msg.author.id;
	if (msg.mentions.users.first()) suffix = msg.mentions.users.first().id;

	const supportGuild = client.guilds.cache.get(config.supportGuild) || await client.guilds.fetch(config.supportGuild)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch HQ server" } }));
	const member = await supportGuild.members.fetch(suffix)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch member in HQ server" } }));

	const perms = await require("../../Internals/modules").updatePerms(member);
	msg.channel.send({ embed: { description: `\`\`\`js\n${require("util").inspect(perms)}\`\`\`` } });
};
