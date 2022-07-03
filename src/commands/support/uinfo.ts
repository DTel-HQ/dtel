import { MessageEmbedOptions, User } from "discord.js";
import Command from "../../internals/commandProcessor";
import { parseNumber } from "../../internals/utils";

export default class UInfo extends Command {
	async run(): Promise<void> {
		const toFind = parseNumber(this.interaction.options.getString("userID", true));

		let user: User;
		try {
			user = await this.client.getUser(toFind);
		} catch {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Couldn't find that user.")],
			});
		}

		const embed: MessageEmbedOptions = {
			author: {
				iconURL: user.displayAvatarURL(),
			},
		};
	}
}
