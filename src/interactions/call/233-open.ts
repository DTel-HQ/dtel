import { SelectMenuOptionBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ModalBuilder, SelectMenuBuilder } from "discord.js";
import { t } from "i18next";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class TwoThreeThreeOpenModalButton extends MessageComponentProcessor {
	async run(): Promise<void> {
		const modal = new ModalBuilder()
			.setTitle(this.t("twoThreeThree.renewNumber"))
			.setCustomId("call-233-renew");

		const monthSelectorOptions: SelectMenuOptionBuilder[] = [];
		// For up to 11 months
		for (let i = 1; i <= 11; i++) {
			const cost = this.config.renewalRate * i;
			if (cost > this.account!.balance) break;

			const option = new SelectMenuOptionBuilder()
				.setLabel(t("generic.month", {
					count: i,
					lng: this.interaction.locale,
				}))
				.setDescription(t("generic.credit", {
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

			const option = new SelectMenuOptionBuilder()
				.setLabel(t("generic.year", {
					count: i,
					lng: this.interaction.locale,
				}))
				.setDescription(t("generic.credit", {
					count: cost,
					lng: this.interaction.locale,
				}))
				.setValue(`y-${i}`);

			monthSelectorOptions.push(option);
		}

		modal.addComponents(new ActionRowBuilder<SelectMenuBuilder>().addComponents([
			new SelectMenuBuilder()
				.setCustomId("call-233-renew")
				.setPlaceholder("Months to renew")
				.addOptions(monthSelectorOptions),
		]) as never);
		// ^^ Not technically supported but does work, easy-ish to convert to text anyway

		this.interaction.showModal(modal);
	}
}
