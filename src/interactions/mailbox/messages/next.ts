import ComponentProcessor from "../../../internals/componentProcessor";
import MailboxMessages from "../../../commands/standard/mailbox messages";

export default class MailboxMessagesNext extends ComponentProcessor {
	async run(): Promise<void> {
		MailboxMessages.displayMessages(this.interaction, this.number!.number, Number(this.interaction.customId.split("-")[3]));
	}
}
