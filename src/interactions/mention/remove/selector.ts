import { ActionRowBuilder, APIEmbed, SelectMenuBuilder, SelectMenuComponent, SelectMenuInteraction } from "discord.js";
import ComponentProcessor from "../../../internals/componentProcessor";

export default class MentionRemoveSelector extends ComponentProcessor {
	async run(): Promise<void> {
		const interaction = this.interaction as SelectMenuInteraction;
		const origSelectMenu = interaction.component as SelectMenuComponent;

		const selectedID = interaction.values[0];
		const selectedUserTag = origSelectMenu.options.find(o => o.value === selectedID)!.label;

		const selector = new SelectMenuBuilder(origSelectMenu.data)
			.setPlaceholder(selectedUserTag)
			.setDisabled(true);

		this.interaction.message?.edit({
			components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents([selector])],
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
