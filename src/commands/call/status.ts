import { APIEmbed, EmbedBuilder } from "discord.js";
import Command from "@src/internals/commandProcessor";
import { getCallMessageCount } from "@src/internals/calls/db/get-call-message-count/GetCallMessageCount";
import { getCallElapsedTime } from "@src/internals/utils/get-call-elapsed-time/GetCallElapsedTIme";

export default class Status extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [EmbedBuilder.from({
				color: this.config.colors.info,
				...(this.t("embed", {
					messageCount: await getCallMessageCount(this.call!.id),
					timeElapsed: getCallElapsedTime(this.call!),
					callID: this.call!.id,
				}) as APIEmbed),
			}).setTimestamp(new Date())],
			ephemeral: true,
		});
	}
}
