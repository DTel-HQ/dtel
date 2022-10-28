import { EmbedBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class MailboxMessages extends Command {
	async run(): Promise<void> {
		const mailbox = await this.fetchMailbox();

		const embed = new EmbedBuilder()
			.setColor(this.config.colors.info)
			.setTitle(`📬 You have ${mailbox.messages.length} messages.`);

		if (mailbox.messages.length === 0) {}
	}
}
