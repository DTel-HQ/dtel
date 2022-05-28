import { MessageEmbedOptions } from "discord.js";
import ModalProcessor from "../../internals/modalProcessor";

export default class WizardModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		const number = this.client.parseNumber(this.interaction.fields.getTextInputValue("wizardNumber"));

		if (isNaN(Number(number))) {
			this.interaction.reply({ content: `${this.t("errors.numberInvalid")} ${this.interaction.guild ? "0301" : "0900"}`, ephemeral: true });
			return;
		}

		const dbNumber = await this.db.numbers.findUnique({
			where: {
				number: number,
			},
		});

		if (dbNumber) {
			this.interaction.reply({ content: `${this.t("errors.numberInUse")} ${this.interaction.guild ? "0301" : "0900"}`, ephemeral: true });
			return;
		}

		// TODO check if number's formatting is valid

		const expiry = new Date();
		expiry.setMonth(expiry.getMonth() + 1);
		await this.db.numbers.create({
			data: {
				number: number,
				channelID: this.interaction.channelId!,
				expiry,
			},
		});


		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,

				...this.t("successEmbed", { returnObjects: true, number: this.interaction.fields.getTextInputValue("wizardNumber"), expiry }) as MessageEmbedOptions,
			}],
		});
	}
}
