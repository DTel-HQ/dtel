import { InteractionReplyOptions, APIEmbed } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class Help extends Command {
	async run(): Promise<void> {
		const toSend: InteractionReplyOptions = {
			embeds: [{
				color: this.config.colors.info,
				author: {
					name: this.client.user.username,
					icon_url: this.client.user.displayAvatarURL(),
					url: this.config.siteLink,
				},
				...(this.t("embed") as APIEmbed),
			}],

			ephemeral: true,
		};

		this.interaction.reply(toSend);
	}
}
