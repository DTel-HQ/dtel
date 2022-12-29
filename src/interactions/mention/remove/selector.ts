import { ActionRowBuilder, APIEmbed, StringSelectMenuBuilder, SelectMenuComponent, SelectMenuInteraction } from "discord.js";
import ComponentProcessor from "../../../internals/componentProcessor";

export default class MentionRemoveSelector extends ComponentProcessor<SelectMenuInteraction> {
	async run(): Promise<void> {
		const origSelectMenu = this.interaction.component as SelectMenuComponent;

		const selectedID = this.interaction.values[0];
		const selectedUserTag = origSelectMenu.options.find(o => o.value === selectedID)!.label;

		const selector = new StringSelectMenuBuilder(origSelectMenu.data)
			.setPlaceholder(selectedUserTag)
			.setDisabled(true);

		this.interaction.message?.edit({
			components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([selector])],
		});

		const mentionsList = this.number!.mentions;
		mentionsList.splice(mentionsList.indexOf(selectedID), 1);

		await this.db.numbers.update({
			where: {
				channelID: this.interaction.channelId,
			},
			data: {
				mentions: mentionsList,
			},
		});

		this.interaction.reply({
			embeds: [{
				color: 0x00FF00,
				...this.t("removeEmbed", {
					user: selectedUserTag,
				}) as APIEmbed,
			}],
		});
	}
}
