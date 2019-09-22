const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!msg.author.manager) return msg.channel.send({ embed: { color: config.colors.error, title: "No permission", description: "Please contact your manager or a boss to whitelist the server." } });
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Missing argument", description: "Missing an argument! Usage: `>whitelist [guildID]`" } });

	const guild = await client.api.guilds(suffix).get();
	if (!guild) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown ID", description: "The given ID does not match a (known) guild." } });

	const whitelist = await r.table("Whitelist").get(guild.id);
	if (whitelist) await r.table("Whitelist").get(guild.id).delete();
	else await r.table("Whitelist").insert({ id: guild.id });

	if (!whitelist) client.log(`📃 ID \`${guild.id}\` has been added to the whitelist by ${msg.author.tag}`);
	else client.log(`🔥 ID \`${guild.id}\` has been removed from the whitelist by ${msg.author.tag}`);
	msg.channel.send({ embed: { color: config.colors.success, title: whitelist ? "Removed" : "Added", description: whitelist ? `Succesfully removed ${guild.id} from the whitelist.` : `Succesfully added ${guild.id} to the whitelist.` } });
};
