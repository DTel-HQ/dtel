import { EmbedBuilder } from "discord.js";
import Command from "@src/internals/commandProcessor";

export default class MentionList extends Command {
	async run(): Promise<void> {
		const mentions = this.number!.mentions;

		const embed = EmbedBuilder.from(this.t("listEmbed", {
			list: mentions.length ? mentions.map(m => m.toString()).join(", ") : this.t("listEmpty"),
			interpolation: {
				escapeValue: false,
			},
		})).setColor(this.config.colors.info);

		await this.interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	}
}
