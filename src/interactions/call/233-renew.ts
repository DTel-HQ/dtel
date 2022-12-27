import dayjs from "dayjs";
import { SelectMenuInteraction } from "discord.js";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class TwoThreeThreeRenewModal extends MessageComponentProcessor<SelectMenuInteraction> {
	async run() {
		const selected = this.interaction.values[0]; // eg m-1, m-2, y-1

		const split = selected.split("-");
		const monthYear = split[0];
		const amount = Number(split[1]);

		// Calculate cost to renew
		const cost = this.config.renewalRate * amount * (monthYear === "y" ? 12 : 1);

		if (cost > this.account!.balance) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("twoThreeThree.cantAffordAfterSelector"))],
			});
			return;
		}

		this.account!.balance -= cost;

		await this.db.accounts.update({
			where: {
				id: this.interaction.user.id,
			},
			data: {
				balance: this.account!.balance,
			},
		});

		const newExpiry = dayjs(this.number!.expiry).add(amount, monthYear === "y" ? "year" : "month");

		await this.db.numbers.update({
			where: {
				number: this.number!.number,
			},
			data: {
				expiry: newExpiry.toDate(),
			},
		});

		const amountOfTimeDisplay = this.genericT(monthYear === "m" ? "month" : "year", { count: amount });

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.receipt,
				author: {
					name: this.interaction.user.username,
					icon_url: this.interaction.user.displayAvatarURL(),
				},

				...this.t("twoThreeThree.receiptEmbed", {
					amountOfTime: amountOfTimeDisplay,
					number: this.number!.number,
					expiration: newExpiry.format("YYYY-MM-DD"),
					balance: this.account!.balance,
				}),
			}],
		});
	}
}
