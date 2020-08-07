const { MessageEmbed } = require("discord.js");

const reaction = "💡";

module.exports = async(client, msg, suffix) => {
	let number, dmChannel, id;

	id = suffix.split(" ")[0];
	if (!id) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >ninfo [number/channelID]" } });

	let user = msg.mentions.users.first() ? msg.mentions.users.first() : await client.users.fetch(suffix).catch(e => null);
	if (user) dmChannel = await (await client.users.cache.get(user.id)).createDM();
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
	const vipNumber = number.vip ? new Date(number.vip.expiry) > Date.now() : false;
	const [strikes, ownerStrikes, guildWhitelisted, entry, mailbox] = Promise.all([
		guild ? r.table("Strikes").getAll(guild.id, { index: "offender" }).default([]) : r.table("Strikes").getAll(owner.id, { index: "offender" }).default([]),
		!guild ? [] : r.table("Strikes").getAll(guild.owner_id, { index: "offender" }).default([]),
		guild ? r.table("Whitelist").get(guild.id) : false,
		r.table("Phonebook").get(number.id),
		r.table("Mailbox").get(channel.id),
	]);

	const details = [];
	if (entry) details.push("phonebook entry");
	if (mailbox) details.push("mailbox autoreply");
	if (strikes.length) details.push("guild strikes");

	const embed_compact = new MessageEmbed()
		.setColor(vipNumber ? config.colors.vip : config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle(`Simple information about ${number.id}`)
		.addField("Channel", `${channel.type === 1 ? "_DM Channel_" : channel.name}\`${channel.id}\``, true)
		.addField("Owner", `${owner.tag}\n\`${guild ? guild.owner_id : channel.recipients[0].id}\`${!guild ? "" : `\nStrikes: ${ownerStrikes.length}`}`, true)
		.addField("Guild", guild ? `${guild.name}\`${guild.id}\`\nWhitelisted: ${guildWhitelisted ? "True" : "False"}` : "DM Number", true)
		.addField("VIP", vipNumber ? "True" : "False", true)
		.addField("Blocked", number.blocked ? number.blocked.length : 0, true)
		.addField(`${guild ? "Guild" : "Owner"} strikes`, strikes.length, true)
		.addField("Created, expiry", `• ${number.createdAt || "Not available"}\n• ${new Date(number.expiry)}`);
	if (guild && guild.icon) embed_compact.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`);
	if (details.length) embed_compact.setDescription(`Hit the lightbulb for more information on: ${details.join(", ")}.`);

	const embedmsg = await msg.channel.send({ embed: embed_compact });
	if (!details.length) return;

	await embedmsg.react(reaction);
	const collected = await embedmsg.awaitReactions((r, u) => u.id === msg.author.id && r.emoji.name === reaction, { time: 45000, max: 1 });
	if (!collected.first()) return;

	const embed_details = new MessageEmbed()
		.setColor(vipNumber ? config.colors.vip : config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle(`Detailed information about ${number.id}`);
	if (guild && guild.icon) embed_details.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`);

	if (entry) embed_details.addField("Phonebook description", entry.description);
	if (mailbox) embed_details.addField("Mailbox autoreply", mailbox.autoreply);
	if (strikes.length) {
		for (let strike of strikes) {
			let creator = await client.users.fetch(strike.creator);
			if (creator) creator = creator.tag;
			embed_details.addField(
				`Guild strike \`${strike.id}\` by ${creator || strike.creator}`,
				`• Reason: ${strike.reason}\n• Time: ${strike.date || "unknown"}`,
			);
		}
	}

	await embedmsg.edit({ embed: embed_details });
	await embedmsg.reactions.removeAll();
};
