import Command from "../../internals/commandProcessor";
import config from "../../config/config";
import { MessageEmbedOptions } from "discord.js";
import { t } from "i18next";

export default class Links extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [{
				color: config.colors.info,
				author: {
					name: this.client.user.username,
					icon_url: this.client.user.displayAvatarURL(),
					url: config.siteLink,
				},
				...(t("commands.links.embed", {
					siteLink: config.siteLink,
					botInvite: config.botInvite,
					suggestLink: config.suggestLink,
					applyLink: config.applyLink,
					guildInvite: config.guildInvite,
					paymentLink: config.paymentLink,
					githubLink: config.githubLink,
					vipLink: config.vipLink,
					voteLink: config.voteLink,

					donatorPhone: config.callPhones.donator,

					interpolation: {
						escapeValue: false,
					},
				}) as MessageEmbedOptions),
			}],
		});
	}
}
