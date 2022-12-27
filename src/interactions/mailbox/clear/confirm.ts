import { ButtonInteraction } from "discord.js";
import ComponentProcessor from "../../../internals/componentProcessor";

export default class MailboxClearConfirm extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		await this.db.mailbox.update({
			where: {
				number: this.number!.number,
			},
			data: {
				messages: [],
			},
		});

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				title: "📪 Cleared!",
				description: "Your mailbox has been cleared.",
			}],
		});
	}
}
