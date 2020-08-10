const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!msg.author.manager) return msg.channel.send({ embed: { color: config.colors.error, title: "No permission", description: "Please contact your manager or a boss to whitelist the server." } });
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Missing argument", description: "Missing an argument! Usage: `>whitelist [guildID]`" } });

	const guild = await client.guilds.resolve(suffix);
	if (!guild) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown ID", description: "The given ID does not match a (known) guild." } });

	const whitelist = await r.table("Whitelist").get(guild.id);
	if (whitelist) await r.table("Whitelist").get(guild.id).delete();
	else await r.table("Whitelist").insert({ id: guild.id });

	const dmChannel = await guild.owner.user.createDM();
	if (!whitelist) {
		client.log(`📃 ID \`${guild.id}\` has been added to the whitelist by ${msg.author.tag}`);
		dmChannel.send({ embed: { color: config.colors.info, title: `Your server ${guild.name} has been whitelisted.`, description: "You now have the ability to create more than three numbers.\n\nNote: we expect good behaviour from whitelisted server, so any violation of our rules can result in losing the whitelist." } })
			.catch(e => null);
	}	else {
		client.log(`🔥 ID \`${guild.id}\` has been removed from the whitelist by ${msg.author.tag}`);
		dmChannel.send({ embed: { color: config.colors.error, title: `Your server ${guild.name} has lost its whitelist.`, description: "If you were not informed of this action or feel like it's unjust, you may dispute it with one of our bosses through the support server." } })
			.catch(e => null);
	}
	msg.channel.send({ embed: { color: config.colors.success, title: whitelist ? "Removed" : "Added", description: whitelist ? `Succesfully removed ${guild.id} from the whitelist.` : `Succesfully added ${guild.id} to the whitelist.` } });
};
