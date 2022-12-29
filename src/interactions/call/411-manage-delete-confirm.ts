import { ButtonInteraction, EmbedBuilder } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";

export default class Call411EditDeleteConfirm extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		this.interaction.deferUpdate();

		await this.db.phonebook.delete({
			where: {
				number: this.number!.number,
			},
		});

		const embed = new EmbedBuilder()
			.setColor(this.config.colors.success)
			.setTitle("✅ Success!")
			.setDescription(`Removed your number from the Yellowbook.`);

		await this.interaction.message!.edit({
			embeds: [embed],
			components: [],
		});
	}
}
