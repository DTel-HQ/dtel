import { MessageEmbedOptions } from "discord.js";
import ModalProcessor from "../../internals/modalProcessor";
import { parseNumber } from "../../internals/utils";

export default class WizardModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		const number = parseNumber(this.interaction.fields.getTextInputValue("wizardNumber"));

		if (isNaN(Number(number)) || !number.startsWith(this.numberShouldStartWith())) {
			this.interaction.reply({ content: `${this.t("errors.numberInvalid")} ${this.numberShouldStartWith()}`, ephemeral: true });
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

		const expiry = new Date();
		expiry.setMonth(expiry.getMonth() + 1);
		await this.db.numbers.create({
			data: {
				number: number,
				channelID: this.interaction.channelId!,
				guildID: this.interaction.guildId!,
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
