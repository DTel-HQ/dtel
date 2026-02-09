import ComponentProcessor from "@src/internals/componentProcessor";
import MailboxMessages from "@src/commands/standard/mailbox messages";
import { ButtonInteraction } from "discord.js";

export default class MailboxMessagesPrev extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		MailboxMessages.displayMessages(this.interaction, this.number!.number, Number(this.interaction.customId.split("-")[3]));
	}
}
