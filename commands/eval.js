const Discord = require("discord.js");
const PastebinAPI = require("pastebin-js");
const pastebin = new PastebinAPI(process.env.PASTEBIN_KEY);

module.exports = async(client, message, args) => {
	const eval = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.BOSSROLE).members.has(user_id);
	if (eval(message.author.id)) {
		if (args) {
			let hrstart = process.hrtime();
			try {
				if (args.startsWith("```js") && args.endsWith("```")) args = args.substring(5, args.length - 3);
				const asyncEval = (code, returns) => `(async () => {\n${!returns ? `return ${code.trim()}` : `${code.trim()}`}\n})()`;
				let result = await eval(asyncEval(args, args.includes("return")));
				// if (typeof result !== "string") result = require("util").inspect(result, false, 1);
				let array = [
					client.token.escapeRegex(),
					process.env.DISCORD_TOKEN.escapeRegex(),
					process.env.PASTEBIN_KEY.escapeRegex(),
					// process.env.DBL_ORG_TOKEN.escapeRegex(),
					// process.env.BOTS_PW_TOKEN.escapeRegex(),
					// process.env.DISCOIN_TOKEN.escapeRegex(),
				];
				let regex = new RegExp(array.join("|"), "g");
				result = result.replace(regex, "DID YOU JUST TRY TO BETRAY OUR SOVIET MOTHERLAND?!?!?!?");
				if (result.length <= 1980) {
					message.channel.send({
						embed: {
							color: 0x00FF00,
							title: "Great Success",
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
									text: "Sorry for the inconvenience.",
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
		} else {
			message.channel.send({
				embed: {
					color: 0xFF0000,
					title: ":x: Error",
					description: `You didn't specifiy anything to eval.`,
					footer: {
						text: `Come on, give me something to work with!`,
					},
				},
			});
		}
	} else {
		message.channel.send({
			embed: {
				color: 0xFF0000,
				title: ":x: Error",
				description: "You do not have permission to execute this command.",
				footer: {
					text: "DTelHell",
				},
			},
		});
	}
};
