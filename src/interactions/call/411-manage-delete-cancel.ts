import { ButtonInteraction, EmbedBuilder } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";

export default class Call411EditDeleteConfirm extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const embed = new EmbedBuilder()
			.setColor(this.config.colors.error)
			.setTitle("❌ Cancelled!");

		await this.interaction.message!.edit({
			embeds: [embed],
			components: [],
		});
	}
}
