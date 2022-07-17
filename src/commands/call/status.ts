import { APIEmbed, EmbedBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class Status extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [EmbedBuilder.from({
				color: this.config.colors.info,
				...(this.t("embed", {
					messageCount: await this.call!.countMessages(),
					timeElapsed: this.call!.timeElapsed,
					callID: this.call!.id,
				}) as APIEmbed),
			}).setTimestamp(new Date())],
			ephemeral: true,
		});
	}
}
