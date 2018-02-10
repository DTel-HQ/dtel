const snekfetch = require("snekfetch");

module.exports = async(client, guild) => {
	await guild.members.fetch();
	let canDMOwner = true;
	const ownerMessage = [
		`Hello, I'm **DiscordTel**, the telephone solution for Discord, and I've been added to \`${guild}\`, a server you own!`,
		`To learn more, type \`${process.env.PREFIX}info\`. To get command help, type \`${process.env.PREFIX}help\``,
		`To get a number, please read **<http://discordtel.rtfd.io/>** and then type \`${process.env.PREFIX}wizard\` in the channel you wish to enable this service.`,
		`:warning: No troll calls. You are required to read the documentation.`,
		`To keep your number available you need to renew your number which is instructed at **<http://discordtel.readthedocs.io/en/latest/Payment/>**.`,
		`**ToS Compliance:** <http://discordtel.readthedocs.io/en/latest/ToS%20Compliance/>`,
	].join("\n");
	try {
		await guild.owner.send(ownerMessage);
	} catch (err) {
		canDMOwner = false;
		console.log(`The bloody OWNER doesn't have bot dms on!`);
	}
	if (!guild.me.permissions.has("EMBED_LINK") && canDMOwner) {
		guild.owner.send("I don't seem to have the `Embed Links` permission in your server. This may cause issues with DiscordTel, so please make sure I have that permission.");
	}

	const censorship = guild.name.replace(/discord\.(gg|io|me|li)\/([0-9]|[a-z])*/g, "**Invite link censored**");
	try {
		await client.api.channels(process.env.LOGSCHANNEL).messages.post({
			data: {
				content: `:inbox_tray: Joined \`${censorship}\` (${guild.id}). Currently in ${client.guilds.size} servers on shard **${client.shard.id}**.`,
			},
		});
	} catch (err) {
		console.log(`[Shard ${client.shard.id}] Failed to post join message for leaving guild`, err);
	}
	client.user.setActivity(`${client.guilds.size} servers on shard ${client.shard.id} | ${process.env.PREFIX}help`);
	if (process.env.BOTS_PW_TOKEN) {
		try {
			await snekfetch.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
				.set(`Authorization`, process.env.BOTS_PW_TOKEN)
				.set(`Content-Type`, "application/json")
				.send({
					shard_id: client.shard.id,
					shard_count: client.shard.count,
					server_count: client.guilds.size,
				});
		} catch (err) {
			console.log(`[Shard ${client.shard.id}] Failed to post to DBots`, err);
		}
	}
};
