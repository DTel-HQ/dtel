module.exports = async msg => {
	if (msg.author.bot || !client.done || (config.devOnlyMode && !config.maintainers.includes(msg.author.id))) return;
	const perms = await msg.author.getPerms(msg.author.id);

	// Fix messages
	msg.content = msg.content.replace(/^[\n‌]+$/igm, "").replace(/\s{5,}/m, "     ").replace(/^ +| +$/, "");
	const prefix = msg.content.startsWith(client.user) ? `${client.user} ` : msg.content.startsWith(config.prefix) ? config.prefix : await msg.author.prefix;

	// Check for call
	let call = await msg.channel.call;

	// Check if they're blacklisted → yes? return
	if (await msg.author.blacklisted || (msg.guild && await msg.guild.blacklisted)) return;

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
	}
	if (!msg.content.startsWith(prefix)) return;

	// check busy first since it's a simple return
	let busy = await r.table("Busy").get(msg.author.id);
	if (busy && !config.maintainers.includes(msg.author.id)) return;


	// Find Maintainer or Support commands
	cmdFile = await reload(`./Commands/Public/${cmd}`);
	if (config.maintainers.includes(msg.author.id) && !cmdFile) cmdFile = await reload(`./Commands/Private/${cmd}`);
	if ((await msg.author.getPerms()).support && !cmdFile) cmdFile = await reload(`./Commands/Support/${cmd}`);
	if (!cmdFile) return;

	// Check cooldown now because it sends an embed
	let cooldown = await r.table("Cooldowns").get(`${msg.author.id}-default`);
	if (cooldown && cooldown.time > Date.now() && !perms.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Cooldown", description: `You're under cooldown for another ${Math.round((cooldown.time - Date.now()) / 1000, 1)}s` } });
	// Add cooldown
	if (!perms.support && !perms.donator) msg.author.cooldown = "default";
	// Run the command
	if (cmdFile) {
		if (cmd !== "eval") winston.info(`[${cmd}] ${msg.author.tag}(${msg.author.id}) => ${msg.content}`);
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
