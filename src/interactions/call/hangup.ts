import { ButtonInteraction } from "discord.js";
import MessageComponentProcessor from "@src/internals/componentProcessor";
import { hangupCallByNumber } from "@src/internals/calls/hangup/HangupCallByNumber";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { getNumberFromDbByChannel } from "@src/internals/numbers/get-from-db-by-channel/GetNumberFromDbByChannel";

export default class CallHangupButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const number = await getNumberFromDbByChannel(this.interaction.channelId);
		if (!number) {
			await this.interaction.reply({
			// TODO: i18n
				embeds: [generateErrorEmbed("Couldn't find your number. Try again later.")],
			});
		}

		// TODO: Properly handle this
		if (!this.number) return;
		return hangupCallByNumber(this.number, this.interaction);
	}
}
