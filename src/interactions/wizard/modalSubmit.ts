import dayjs from "dayjs";
import { APIEmbed } from "discord.js";
import ModalProcessor from "../../internals/modalProcessor";
import { parseNumber } from "../../internals/utils";

export default class WizardModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		const number = parseNumber(this.interaction.fields.getTextInputValue("wizardNumber"));

		if (isNaN(Number(number))) {
			this.interaction.reply({ content: `${this.t("errors.numberInvalid")}`, ephemeral: true });
			return;
		}
		if (!number.startsWith(this.numberShouldStartWith())) {
			this.interaction.reply({ content: `${this.t("errors.numberBadFormat", { numberStartsWith: this.numberShouldStartWith() })}`, ephemeral: true });
			return;
		}

		const dbNumber = await this.db.numbers.findUnique({
			where: {
				number: number,
			},
		});

		if (dbNumber) {
			this.interaction.reply({ content: `${this.t("errors.numberInUse")}`, ephemeral: true });
			return;
		}

		const expiry = dayjs().add(1, "month").toDate();

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

				...this.t("successEmbed", { returnObjects: true, number: this.interaction.fields.getTextInputValue("wizardNumber").toUpperCase(), expiry }) as APIEmbed,
			}],
		});

		this.client.log(`📘 Number \`${number}\` has been self-assigned to \`${this.interaction.channelId}\` by \`${this.interaction.user.username}\` \`${this.interaction.user.id}\``);
	}
}
