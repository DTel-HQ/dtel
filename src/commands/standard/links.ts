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
				...(t("commands.links.embed") as MessageEmbedOptions),
			}],
			ephemeral: true,
		});
	}
}
