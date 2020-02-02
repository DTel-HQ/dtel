const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	let number, dmChannel, id;

	id = suffix.split(" ")[0];
	if (!id) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >ninfo [number/channelID]" } });

	let user = msg.mentions.users.first() ? msg.mentions.users.first() : await client.users.fetch(suffix).catch(e => null);
	if (user) dmChannel = await (await client.users.get(user.id)).createDM();
	if (dmChannel) number = await r.table("Numbers").getAll(dmChannel.id, { index: "channel" }).nth(0).default(null);
	if (msg.mentions.channels.first()) id = (await msg.mentions.channels.first()).id;
	if (!number) number = await r.table("Numbers").getAll(id, { index: "channel" }).nth(0).default(null);
	id = await client.replaceNumber(id);
	if (!number) number = await r.table("Numbers").get(id);
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "Couldn't find that number." } });

	// delete if needed
	const channel = await client.api.channels(number.channel).get().catch(e => null);
	if (!channel) {
		await client.delete(number, { force: false, log: true, origin: "ninfo" });
		return msg.channel.send({ embed: { color: config.colors.info, title: `Deleting ${number.id}`, description: `Couldn't find the number's channels, it'll be deleted soon.`, timestamp: new Date() } });
	}

	// Get tha information
	const guild = channel.guild_id ? await client.api.guilds(channel.guild_id).get().catch(e => null) : null;
	const owner = guild ? await client.users.fetch(guild.owner_id).catch(e => null) : await client.users.fetch(channel.recipients[0].id).catch(e => null);
	const strikes = guild ? await r.table("Strikes").getAll(guild.id, { index: "offender" }).default([]) : await r.table("Strikes").getAll(owner.id, { index: "offender" }).default([]);
	const ownerBlacklisted = await r.table("Blacklist").get(owner.id);
	const guildBlacklisted = guild ? await r.table("Blacklist").get(guild.id) : false;
	const guildWhitelisted = guild ? await r.table("Whitelist").get(guild.id) : false;
	const vipNumber = number.vip ? new Date(number.vip.expiry) > Date.now() : false;


	const embed = new MessageEmbed()
		.setColor(vipNumber ? config.colors.vip : config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle(`Number information for ${number.id}${vipNumber ? " (VIP)" : ""}`)
		.setDescription("Here you can find all information relevant to this number")
		.addField("Channel", `ID: \`${channel.id}\`\nName: ${channel.type === 1 ? "DM Channel" : channel.name}\nDM: ${channel.type === 1 ? "True" : "False"}`, true)
		.addField("Owner", `ID: \`${guild ? guild.owner_id : channel.recipients[0].id}\`\nTag: ${owner.tag}\nBlacklisted: ${ownerBlacklisted ? "True" : "False"}`, true)
		.addField("Guild", guild ? `ID: \`${guild.id}\`\nName: ${guild.name}\nBlacklisted: ${guildBlacklisted ? "True" : "False"}\nWhitelisted: ${guildWhitelisted ? "True" : "False"}` : "DM Number", true)
		.addField("Created, expiry", `• ${number.createdAt}\n• ${new Date(number.expiry)}`, true)
		.addField("Blocked", number.blocked && number.blocked.length ? number.blocked.join(", ") : "None", true)
		.addField(`${guild ? "Guild" : "Owner"} strikes`, strikes.length ? strikes.map(s => `${strikes.indexOf(s) + 1}. \`${s.id}\`: ${s.reason}`).join("\n") : "None");
	if (guild && guild.icon) embed.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`);
	return msg.channel.send({ embed: embed });
};
