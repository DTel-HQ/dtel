import { MessageActionRow, MessageButton } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class Eval extends Command {
	async run(): Promise<void> {
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
