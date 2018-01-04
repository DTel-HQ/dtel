const PastebinAPI = require("pastebin-js");
const pastebin = new PastebinAPI(process.env.PASTEBIN_KEY);
// REWRITTEN
module.exports = async(bot, message, args) => {
	let hrstart = process.hrtime();
	// permission check
	if (!bot.guilds.get("281815661317980160").members.get(message.author.id).hasRole(message.guild.roles.find("name", "Boss"))) return;
	if (!args) {
		message.channel.send("You need to actually put an evaluation.");
		return;
	}
	if (args.startsWith("```js") && args.endsWith("```")) args = args.substring(5, args.length - 3);
	// prevent anyone from getting the token
	let array = [
		bot.token.escapeRegex(),
		// process.env.escapeRegex(),
		process.env.DISCORD_TOKEN.escapeRegex(),
		process.env.PASTEBIN_KEY.escapeRegex(),
		process.env.DBL_ORG_TOKEN.escapeRegex(),
		process.env.BOTS_PW_TOKEN.escapeRegex(),
		process.env.DISCOIN_TOKEN.escapeRegex(),
	];
	let regex = new RegExp(array.join("|"), "g");
	try {
		const asyncEval = (code, returns) => `(async () => {\n${!returns ? `return ${code.trim()}` : `${code.trim()}`}\n})()`;
		let result = await eval(asyncEval(args, args.includes("return")));
		if (typeof result !== "string") result = require("util").inspect(result, false, 1);
		// don't send it if it has the token.
		result = result.replace(regex, "DID YOU JUST TRY TO BETRAY OUR SOVIET MOTHERLAND?!?!?!?");
		if (result.length <= 1980) {
			message.channel.send({
				embed: {
					color: 0x00FF00,
					title: "Great Success!",
					description: `\`\`\`js\n${result}\`\`\``,
					footer: {
						text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
					},
				},
			});
		} else {
			let time;
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1;
			let yyyy = today.getFullYear();
			if (dd < 10) {
				dd = `0${dd}`;
			}
			if (mm < 10) {
				mm = `0${mm}`;
			}
			time = `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`;
			today = `${dd}/${mm}/${yyyy}`;
			pastebin.createPaste(result, `Eval results: ${time} ${today}`, "javascript", 1, "1W").then(data => {
				message.channel.send({
					embed: {
						color: 0x3669FA,
						title: `The eval results were too large!`,
						description: `So I uploaded them to Pastebin! ${data}`,
						footer: {
							text: "Get Rekt",
						},
					},
				});
			});
		}
	} catch (err) {
		message.channel.send({
			embed: {
				color: 0xFF0000,
				title: "Evaluation oof",
				description: `\`\`\`js\n${err.stack}\`\`\``,
				footer: {
					text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
				},
			},
		});
	}
};
