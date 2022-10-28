import ModalProcessor from "../../../internals/modalProcessor";

export default class MailboxSettingsUpdate extends ModalProcessor {
	async run(): Promise<void> {
		const newAutoreplyMsg = this.interaction.fields.getTextInputValue("autoreply");
		const _active = this.interaction.fields.getTextInputValue("active").toUpperCase();

		// I hate this
		let newReceivingMessages;
		switch (_active) {
			case "ON": {
				newReceivingMessages = true;
				break;
			}
			case "OFF": {
				newReceivingMessages = false;
				break;
			}
			default: {
				this.interaction.reply({
					embeds: [this.client.errorEmbed("Invalid value for receiving messages. Please enter either `ON` or `OFF`.")],
				});
				return;
			}
		}

		await this.db.mailbox.update({
			where: {
				number: this.number!.number,
			},
			data: {
				autoreply: newAutoreplyMsg,
				receiving: newReceivingMessages,
			},
		});

		// TODO: Localize
		this.interaction.reply({
			embeds: [{
				color: this.config.colors.info,
				title: "📬 Success!",
				description: `Mailbox settings for \`${this.number!.number}\` updated!`,
				fields: [{
					name: "Answering Machine",
					value: newAutoreplyMsg,
				}, {
					name: "Message Receiving",
					value: `\`${_active}\``,
				}],
			}],
		});
	}
}
