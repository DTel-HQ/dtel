import ModalProcessor from "../../internals/modalProcessor";
import { DTelNumber } from "../../database/schemas/number";
export default class WizardModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		// TOOD: Modify interaction handler to support this weird type
		const number = this.interaction.fields.getTextInputValue("wizardNumber");
		if (isNaN(Number(number))) {
			this.interaction.reply({ content: this.t("modal.numberInvalid"), ephemeral: true });
			return;
		}

		if (isNaN(Number(number))) {
			this.interaction.reply({ content: `${this.t("modal.numberInvalid")} ${this.interaction.guild ? "0301" : "0900"}`, ephemeral: true });
			return;
		}

		const dbNumber: DTelNumber = await this.client.db.numbers.findById(number).exec();

		if (dbNumber) {
			this.interaction.reply({ content: `${this.t("modal.numberInUse")} ${this.interaction.guild ? "0301" : "0900"}`, ephemeral: true });
			return;
		}

		const expiry = new Date();
		expiry.setMonth(expiry.getMonth() + 1);
		await this.client.db.numbers.create({
			_id: number,
			channel: this.interaction.channel.id,
			expiry,
		});


		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,

				...this.t("successEmbed", { returnObjects: true }),
			}],
		});
	}
}
