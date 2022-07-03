/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageAttachment } from "discord.js";
import { inspect } from "util";
import Command from "../../internals/commandProcessor";

const escapeRegex = (str: string) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

export default class Eval extends Command {
	async run(): Promise<void> {
		const client = this.client;
		const config = this.client.config;
		const winston = this.client.winston;

		const hrstart = process.hrtime();
		let payload = this.interaction.options.get("code", true).value as string;
		try {
			if (payload.startsWith("```js") && payload.endsWith("```")) payload = payload.substring(5, payload.length - 3);

			const asyncPayload = (code: string) => `(async () => {\n${!payload.includes("return") ? `return ${code.trim()}` : `${code.trim()}`}\n})()`;

			payload = payload
				.replace("this.client.token", "")
				.replace(/\.token/g, "");

			const array = [
				escapeRegex(this.client.token!),
			];
			const regex = new RegExp(array.join("|"), "g");
			let result = await eval(asyncPayload(payload));

			if (typeof result !== "string") result = inspect(result, false, 2);
			result = result.replace(regex, "mfa.Jeff");
			if (result.length <= 1980) {
				this.interaction.reply({
					embeds: [{
						color: config.colors.success,
						description: `\`\`\`js\n${result}\`\`\``,
						footer: {
							text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
						},
					}],
				});
			} else {
				this.interaction.reply({
					embeds: [{
						color: config.colors.info,
						title: `The eval results were too large!`,
						description: `As such, I've saved them to a file. Here are the results!`,
					}],
					files: [
						new MessageAttachment(Buffer.from(result), "eval-results.txt"),
					],
				});
			}
		} catch (_err) {
			const err = _err as Error;
			this.interaction.reply({
				embeds: [{
					color: 0xFF0000,
					description: `\`\`\`js\n${err.stack}\`\`\``,
					footer: {
						text: `Execution time: ${process.hrtime(hrstart)[0]}s ${Math.floor(process.hrtime(hrstart)[1] / 1000000)}ms`,
					},
				}],
			});
		}
	}
}
