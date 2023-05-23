import { EmbedBuilder } from "@discordjs/builders";
import CommandProcessor from "../../internals/commandProcessor";

export default class Vote extends CommandProcessor {
	async run() {
		this.interaction.reply({
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setColor(this.config.colors.info)
					.setAuthor({
						name: this.client.user.username,
						iconURL: this.client.user.displayAvatarURL(),
					})
					.setTitle("Vote for DTel")
					.setDescription(`You can find details about voting for DTel [here](${this.config.voteLink}). Voters will receive 10 credits per vote!`),
			],
		});
	}
}
