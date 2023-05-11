import { ButtonInteraction, EmbedBuilder } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";

export default class Call411EditDeleteConfirm extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		if (this.interaction.message.interaction?.user.id != this.interaction.user.id) {
			this.interaction.reply({
				ephemeral: true,
				content: "❌ You can't use this menu as you didn't open it.",
			});

			return;
		}

		const embed = new EmbedBuilder()
			.setColor(this.config.colors.error)
			.setTitle("❌ Cancelled!");

		await this.interaction.message!.edit({
			embeds: [embed],
			components: [],
		});
	}
}
