const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();

	let id = suffix.split(" ")[0];
	if (!id) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >ninfo [number/channelID]" } });

	let number = await r.table("Numbers").get(id);
	if (!number) number = await r.table("Numbers").getAll(id, { index: "channel" });
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "Couldn't find that number." } });

	// Get tha information
	const channel = await client.channels.resolve(number.channel);
	const guild = channel.guild ? await client.guilds.resolve(channel.guild.id).catch(e => null) : null;
	const owner = guild ? await client.users.fetch(guild.ownerID).catch(e => client.users.fetch(number.owner).catch(_ => null)) : await client.users.fetch(channel.recipient.id).catch(e => null);
	const strikes = guild ? await r.table("Strikes").getAll(guild.id, { index: "offender" }).default([]) : await r.table("Strikes").getAll(owner.id, { index: "offender" }).default([]);
	const ownerBlacklisted = await r.table("Blacklist").get(owner.id);
	const guildBlacklisted = guild ? await r.table("Blacklist").get(guild.id) : false;


	const embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle(`Number information for ${number.id}`)
		.setDescription("Here you can find all information relevant for this number")
		.addField("Channel", `ID: \`${channel.id}\`\nName: ${channel.type === "dm" ? "DM Channel" : channel.name}\nDM: ${channel.type === "dm" ? "True" : "False"}`, true)
		.addField("Owner", `ID: \`${number.owner ? number.owner : guild.ownerID}\`\nTag: ${owner.tag}\nBlacklisted: ${ownerBlacklisted ? "True" : "False"}`, true)
		.addField("Guild", guild ? `ID: \`${guild.id}\`\nName: ${guild.name}\nBlacklisted: ${guildBlacklisted ? "True" : "False"}` : "None", true)
		.addField("Created, expiry", `• ${number.createdAt}\n• ${new Date(number.expiry)}`, true)
		.addField("Blocked", number.blocked && number.blocked.length ? number.blocked.join(", ") : "None", true)
		.addField(`${guild ? "Guild" : "Owner"} strikes`, strikes.size ? strikes.map(s => `${strikes.indexOf(s)}. ${s.reason}`).join("\n") : "None");
	if (guild) embed.setThumbnail(guild.iconURL());
	return msg.channel.send({ embed: embed });
};
