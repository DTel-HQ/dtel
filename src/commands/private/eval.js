import { post } from "chainfetch";

module.exports = async(client, msg, suffix) => {
	let hrstart;
	if (!suffix) {
		return msg.channel.send({
			embed: {
				color: config.colors.error,
				title: ":x: Error",
				description: `You didn't specifiy anything to eval.`,
				footer: {
					text: `Come on, give me something to work with!`,
				},
			},
		});
	}
	const haste = async data => {
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
		let time = `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`;
		today = `${dd}/${mm}/${yyyy}`;
		let res;
		try {
			res = await post("https://hastebin.com/documents").send(`// Eval results: ${time} ${today}\n\n${data}`);
		} catch (err) {
			return msg.channel.send({
				embed: {
					color: config.colors.error,
					title: ":x: Error!",
					description: `An unexpected error occurred while uploading to Hastebin.\`\`\`js\n${err.stack}\`\`\``,
				},
			});
		}
		return msg.channel.send({
			embed: {
				color: config.colors.info,
				title: `The eval results were too large!`,
				description: `So I uploaded them to Hastebin! https://hastebin.com/${res.body.key}`,
				footer: {
					text: "Sorry for the inconvenience.",
				},
			},
		});
	};
	winston.info(`[Eval] ${msg.author.tag} => ${suffix}`);
	let result;
	try {
		if (suffix.startsWith("```js") && suffix.endsWith("```")) suffix = suffix.substring(5, suffix.length - 3);
		const asyncEval = (code, returns) => `(async () => {\n${!returns ? `return ${code.trim()}` : `${code.trim()}`}\n})()`;
		hrstart = process.hrtime();
		result = await eval(asyncEval(suffix, suffix.includes("return")));
	} catch (err) {
		if (err.stack.length <= 1980) {
			return msg.channel.send({
				embed: {
					color: config.colors.error,
					description: `\`\`\`js\n${err.stack}\`\`\``,
					footer: {
						text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
					},
				},
			});
		} else {
			haste(result);
		}
	}
	if (typeof result !== "string") result = require("util").inspect(result, false, 1);
	let array = [
		client.token.escapeRegex(),
	];
	let regex = new RegExp(array.join("|"), "g");
	result = result.replace(regex, "Censored");
	if (result.length <= 1980) {
		return msg.channel.send({
			embed: {
				color: config.colors.success,
				description: `\`\`\`js\n${result}\`\`\``,
				footer: {
					text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
				},
			},
		});
	} else {
		haste(result);
	}
};
