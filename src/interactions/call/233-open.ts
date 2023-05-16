import { ActionRowBuilder, ButtonInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class TwoThreeThreeOpenModalButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const monthSelectorOptions: StringSelectMenuOptionBuilder[] = [];
		// For up to 11 months
		for (let i = 1; i <= 11; i++) {
			const cost = this.config.renewalRate * i;
			if (cost > this.account!.balance) break;

			const option = new StringSelectMenuOptionBuilder()
				.setLabel(this.genericT("month", {
					count: i,
					lng: this.interaction.locale,
				}))
				.setDescription(this.genericT("credit", {
					count: cost,
					lng: this.interaction.locale,
				}))
				.setValue(`m-${i}`);

			monthSelectorOptions.push(option);
		}
		// For up to 3 years
		for (let i = 1; i <= 3; i++) {
			const cost = this.config.renewalRate * i * 12;
			if (cost > this.account!.balance) break;

			const option = new StringSelectMenuOptionBuilder()
				.setLabel(this.genericT("year", {
					count: i,
					lng: this.interaction.locale,
				}))
				.setDescription(this.genericT("credit", {
					count: cost,
					lng: this.interaction.locale,
				}))
				.setValue(`y-${i}`);

			monthSelectorOptions.push(option);
		}


		this.interaction.reply({
			ephemeral: true,
			components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([
				new StringSelectMenuBuilder()
					.setCustomId("call-233-renew")
					.setPlaceholder(this.t("monthsToRenewLabel"))
					.addOptions(monthSelectorOptions),
			])],
		});

		// this.interaction.showModal(modal);
	}
}
