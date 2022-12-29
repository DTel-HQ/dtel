import { EmbedBuilder } from "discord.js";
import ModalProcessor from "../../internals/modalProcessor";


export default class Call411EditAddModal extends ModalProcessor {
	async run(): Promise<void> {
		this.interaction.deferUpdate();

		const description = this.interaction.fields.getTextInputValue("description");

		await this.db.phonebook.create({
			data: {
				number: this.number!.number,
				description,
			},
		});

		const embed = new EmbedBuilder()
			.setColor(this.config.colors.success)
			.setDescription(`Added your number to the Yellowbook.`)
			.setTitle("✅ Success!")
			.setFields([{
				name: "Number",
				value: this.number!.number,
				inline: true,
			}, {
				name: "Description",
				value: `\`${description}\``,
				inline: true,
			}]);

		await this.interaction.message!.edit({
			embeds: [embed],
			components: [],
		});
	}
}
