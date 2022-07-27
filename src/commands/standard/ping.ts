import Command from "../../internals/commandProcessor";
import config from "../../config/config";

export default class Ping extends Command {
	async run(): Promise<void> {
		// No real point localising a test command
		const embed = {
			color: config.colors.info,
			title: "Pong",
			description: `API Latency: ${this.client.ws.ping}ms\nMeasured time: ${Date.now() - Number(this.interaction.createdAt)}ms`,
		};

		this.interaction.reply({ embeds: [embed] });
	}
}
