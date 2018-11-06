const snekfetch = require("snekfetch");

module.exports = async(client, guild) => {
	let canDMOwner = true;
	const ownerMessage = [
		`Hello, I'm **DiscordTel**, the telephone solution for Discord, and I've been added to \`${guild}\`, a server you own!`,
		`I'm a **roleplay** bot that only works within Discord! This means **I CANNOT CALL REAL NUMBERS!**`,
		`To learn more, type \`${process.env.PREFIX}info\`. To get command help, type \`${process.env.PREFIX}help\``,
		`To get a number, type \`${process.env.PREFIX}wizard\` in the channel you wish to enable this service in.`,
		`:warning: No troll calls. You are required to read the documentation.`,
		`To keep your number available you need to renew your number which is instructed at **<https://discordtel.austinhuang.me/en/latest/Payment/>**.`,
		`**ToS Compliance:** <https://discordtel.austinhuang.me/en/latest/ToS%20Compliance/>`,
	].join("\n");
	try {
		(await guild.members.fetch(guild.owner.id)).send(ownerMessage);
	} catch (err) {
		canDMOwner = false;
		console.log(`The bloody OWNER doesn't have bot dms on!`);
	}
	if (!guild.me.permissions.has("EMBED_LINK") && canDMOwner) {
		guild.owner.send("I don't seem to have the `Embed Links` permission in your server. This may cause issues with DiscordTel, so please make sure I have that permission.");
	}

	// const censorship = guild.name.replace(/discord\.(gg|io|me|li)\/([0-9]|[a-z])*/g, "**Invite link censored**");
	// eslint-disable-next-line no-useless-escape
	const censorship = guild.name.replace(/(\*|\`|\_|\~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	try {
		await client.apiSend(`:inbox_tray: Joined \`${censorship}\` (${guild.id}). Currently in ${client.guilds.size} servers on shard **${client.shard.id}**.`, process.env.LOGSCHANNEL);
	} catch (err) {
		console.log(`[Shard ${client.shard.id}] Failed to post join message for leaving guild`, err);
	}
	if (process.env.BOTS_PW_TOKEN) {
		try {
			await snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
				.set(`Authorization`, process.env.BOTS_ORG_TOKEN)
				.set(`Content-Type`, "application/json")
				.send({
					shard_id: client.shard.id,
					shard_count: client.shard.count,
					server_count: client.guilds.size,
				});
		} catch (err) {
			console.log(`[Shard ${client.shard.id}] Failed to post to DBL`, err);
		}
	}
};
