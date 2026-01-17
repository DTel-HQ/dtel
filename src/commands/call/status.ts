import { APIEmbed, EmbedBuilder } from "discord.js";
import Command from "@src/internals/commandProcessor";
import { getCallMessageCount } from "@src/internals/calls/db/get-call-message-count/GetCallMessageCount";
import { timeSince } from "@src/internals/calls/hangup/messages/utils/TimeSince";

export default class Status extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [EmbedBuilder.from({
				color: this.config.colors.info,
				...(this.t("embed", {
					messageCount: await getCallMessageCount(this.call!.id),
					timeElapsed: timeSince(this.call!.started.at),
					callID: this.call!.id,
				}) as APIEmbed),
			}).setTimestamp(new Date())],
			ephemeral: true,
		});
	}
}
