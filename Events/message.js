module.exports = async msg => {
	if (msg.author.bot) return;

	// Fix messages
	msg.content = msg.content.replace(/^[\n‌]+$/igm, "").replace(/\s{5,}/m, "     ").replace(/^ +| +$/, "");
	let account = await r.table("Accounts").get(msg.author.id) || {};
	const prefix = msg.content.startsWith(client.user) ? `${client.user} ` : msg.content.startsWith(config.prefix) ? config.prefix : account.prefix;

	// Check for call
	let call = (await r.table("Calls").filter(r.row("from")("channel").eq(msg.channel.id).or(r.row("to")("channel").eq(msg.channel.id))))[0];

	// Check if they're blacklisted → yes? return
	let blacklisted = await r.table("Blacklist").get(msg.author.id);
	if (!blacklisted && msg.guild) blacklisted = await r.table("Blacklist").get(msg.guild.id);
	if (blacklisted) return;

	// Filter out the command and arguments to pass
	let cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "")
		.replace(/dial/g, "call");
	if (config.aliasCommands[cmd]) cmd = config.aliasCommands[cmd];
	const suffix = msg.content.split(" ").splice(1)
		.join(" ")
		.trim();

	// Find the command file
	let cmdFile;
	if (call && !msg.content.startsWith(prefix)) {
		return (await reload("./Internals/callHandler.js"))(cmd, msg, suffix, call);
	} else if (call && msg.content.startsWith(prefix)) {
		cmdFile = await reload(`./Commands/Call/${cmd}`);
	} else if (!cmdFile) {
		cmdFile = await reload(`./Commands/Public/${cmd}`);
	}

	// Return if needed
	let busy = await r.table("Busy").get(msg.author.id);
	if (!msg.content.startsWith(prefix) || (busy && !config.maintainers.includes(msg.author.id))) return;

	// Find Maintainer or Support commands
	if (config.maintainers.includes(msg.author.id) && !cmdFile) cmdFile = await reload(`./Commands/Private/${cmd}`);
	if ((await msg.author.getPerms()).support && !cmdFile) cmdFile = await reload(`./Commands/Support/${cmd}`);
	if (!cmdFile) return;

	// Run the command
	if (cmdFile) {
		if (cmd !== "eval") winston.info(`[${cmd}] ${msg.author.tag} => ${msg.content}`);
		try {
			await cmdFile(client, msg, suffix, call);
		} catch (err) {
			msg.channel.send({
				embed: {
					color: config.colors.error,
					title: "❌ Error!",
					description: `An unexpected error has occured.\n\`\`\`js\n${err.stack}\`\`\``,
					footer: {
						text: `Please contact a maintainer: ${config.guildInvite}.`,
					},
				},
			});
		}
	}
};
