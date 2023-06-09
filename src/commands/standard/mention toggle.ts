import { EmbedBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class MentionToggle extends Command {
	async run(): Promise<void> {
		let indexOfMention = this.number!.mentions.indexOf(this.interaction.user.id);
		if (indexOfMention === -1) indexOfMention = this.number!.mentions.indexOf(`<@${this.interaction.user.id}>`);

		// If they're already being mentioned
		if (indexOfMention > -1) {
			this.number!.mentions.splice(indexOfMention, 1);
		} else {
			if (this.number!.mentions.length >= 25) {
				this.interaction.reply({
					embeds: [
						this.client.errorEmbed(this.t("listFull")),
					],
				});
				return;
			}
			this.number?.mentions.push(this.interaction.user.id);
		}

		await this.db.numbers.update({
			where: {
				number: this.number!.number,
			},
			data: {
				mentions: this.number!.mentions,
			},
		});

		const embed = EmbedBuilder.from(this.t("toggleEmbed", {
			addedOrRemoved: indexOfMention === -1 ? "$t(generic.addedTo)" : "$t(generic.removedFrom)",
			interpolation: {
				skipOnVariables: false,
			},
		})).setColor(this.config.colors.success);

		this.interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	}
}
