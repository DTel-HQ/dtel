import ComponentProcessor from "../../../internals/componentProcessor";
import MailboxMessages from "../../../commands/standard/mailbox messages";
import { ButtonInteraction } from "discord.js";

export default class MailboxMessagesPrev extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		MailboxMessages.displayMessages(this.interaction, this.number!.number, Number(this.interaction.customId.split("-")[3]));
	}
}
