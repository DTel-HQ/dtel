import Command from "../../internals/commandProcessor";
import config from "../../config/config";
import { MessageEmbedOptions } from "discord.js";

export default class Info extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [{
				color: config.colors.info,
				author: {
					name: "DTel",
					icon_url: this.client.user.displayAvatarURL(),
					url: config.siteLink,
				},

				...this.t("embed", {
					siteLink: config.siteLink,
					inviteLink: config.botInvite,
					suggestLink: config.suggestLink,
					applyLink: config.applyLink,
					guildInvite: config.guildInvite,
					paymentLink: config.paymentLink,
					interpolation: {
						escapeValue: false,
					},
				}) as MessageEmbedOptions,
			}],
			ephemeral: true,
		});
	}
}
