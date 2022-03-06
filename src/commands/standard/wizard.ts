import { MessageActionRow, MessageButton } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class Wizard extends Command {
	async run(): Promise<void> {
		const preExistingNumber = await this.fetchNumber();
		if (preExistingNumber) {
			return this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.channelHasNumber", { number: preExistingNumber._id }))],
			});
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.yellowbook,

				...this.t("introEmbed", { returnObjects: true }),
			}],
			components: [
				new MessageActionRow().addComponents(new MessageButton().setLabel("I'm ready!").setCustomId("wizard-ready").setEmoji("✔️").setStyle("PRIMARY")),
			],
		});
	}
}
