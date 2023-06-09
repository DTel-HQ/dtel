import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";
import { getUsername } from "../../internals/utils";

export default class MentionRemove extends Command {
	async run(): Promise<void> {
		if (this.number?.mentions.length === 0) {
			this.interaction.reply({
				embeds: [
					this.client.errorEmbed(this.t("listEmpty")),
				],
			});
			return;
		}

		await this.interaction.deferReply();

		const selectMenu = new StringSelectMenuBuilder()
			.setPlaceholder(this.t("selectPrompt"))
			.setCustomId("mention-remove-selector");

		for (const i of this.number!.mentions) {
			const user = await this.client.getUser(i).catch(() => null);
			selectMenu.options.push(
				new StringSelectMenuOptionBuilder()
					.setLabel(`${user ? getUsername(user) : i}`)
					.setValue(i)
					.setDescription(i),
			);
		}

		await this.interaction.followUp({
			components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu)],
		});
	}
}
