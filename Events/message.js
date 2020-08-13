module.exports = async msg => {
	if (msg.author.bot || (config.devOnlyMode && !config.maintainers.includes(msg.author.id))) return;
	// Fix messages
	msg.content = msg.content.replace(/^[\n‌]+$/igm, "").replace(/\s{5,}/m, "     ").replace(/^ +| +$/, "");
	const account = await msg.author.account(),
		prefix = msg.content.startsWith(config.prefix) ? config.prefix : msg.content.startsWith(client.user) ? `${client.user} ` : account.prefix || config.prefix;

	// Extends unextended channels
	if (msg.channel.number === undefined) {
		msg.channel.number = (() => r.table("Numbers").getAll(msg.channel.id, { index: "channel" }).nth(0).default(false))();
	}
	if (msg.channel.number && msg.channel.call === undefined) {
		msg.channel.call = async() => {
			let call = await r.table("Calls").getAll(msg.channel.id, { index: "fromChannel" }).nth(0).default(null);
			if (!call) call = await r.table("Calls").getAll(msg.channel.id, { index: "toChannel" }).nth(0).default(null);
			return call;
		};
	}

	// moved this up here in order for support to be able to run unbusy while busy (to find command) - turret
	// Filter out the command and arguments to pass
	let cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "")
		.replace(/dial/gi, "call");
	if (aliases.aliasCommands[cmd]) cmd = aliases.aliasCommands[cmd];
	const suffix = msg.content.split(" ").splice(1)
		.join(" ")
		.trim();

	// Check for call
	let call = msg.channel.number ? typeof msg.channel.call === "function" ? await msg.channel.call() : await msg.channel.call : null;
	if (!call && !msg.content.startsWith(prefix)) return;

	let cmdFile;
	// Find call command files
	if (call && !msg.content.startsWith(prefix)) return (await reload("./Internals/callHandler.js"))(cmd, msg, suffix, call);

	if (call && msg.content.startsWith(prefix) && (!await msg.author.blacklisted)) cmdFile = await reload(`./Commands/Call/${cmd}`);
	if (!cmdFile && (call && !call.hold)) return;
	// Find non call command files

	if (!cmdFile) cmdFile = await reload(`./Commands/Public/${cmd}`);
	if (!cmdFile) {
		cmdFile = await reload(`./Commands/Support/${cmd}`);
		if (cmdFile && !msg.author.support) return;
	}

	if (!cmdFile && config.maintainers.includes(msg.author.id)) cmdFile = await reload(`./Commands/Private/${cmd}`);
	if (!cmdFile) return;
	if (msg.author.busy && !config.maintainers.includes(msg.author.id) && !(msg.author.support && cmd == "unbusy")) return msg.reply("Couldn't connect you, please close any previous menus (usually `0`)");

	// Check cooldown now because it sends an embed
	let cooldown = await r.table("Cooldowns").get(`${msg.author.id}-default`);
	if (cooldown && cooldown.time > Date.now() && !msg.author.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Cooldown", description: `You're under cooldown for another ${client.format(Math.ceil((cooldown.time - Date.now()) / 100) / 10)}s` } });
	// Add cooldown
	if (!msg.author.support) msg.author.cooldown = "default";
	// Run the command

	if (cmdFile) {
		// check for blacklist
		const userBlacklisted = await msg.author.blacklisted;
		if (msg.guild && await msg.guild.blacklisted) {
			let name = msg.guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
			client.log(`📑 Left guild ${msg.guild.id}(${name}) for being on the blacklist. Currently in ${client.guild.size} servers.`);
			return msg.guild.leave();
		}
		if (userBlacklisted) return;

		if (cmd !== "eval") winston.info(`[${cmd}] ${msg.author.tag}(${msg.author.id}) => ${msg.content}`);
		try {
			// If the user doesn't have an account
			if (account.template) await msg.author.account(true);
			await cmdFile(client, msg, suffix, call);
			msg.author.busy = false;
		} catch (err) {
			msg.author.busy = false;
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
