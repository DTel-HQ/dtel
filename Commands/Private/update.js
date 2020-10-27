module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, description: "update a user their perms\n`>update [userID]`" } });

	const supportGuild = client.guilds.get(config.supportGuild) || client.guilds.fetch(config.supportGuild)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch HQ server" } }));
	const member = supportGuild.members.fetch(suffix)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch member in HQ server" } }));

	require("../../Internals/modules").updatePerms(member);
};
