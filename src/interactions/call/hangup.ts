import MessageComponentProcessor from "../../internals/componentProcessor";

export default class CallHangupButton extends MessageComponentProcessor {
	async run(): Promise<void> {
		const callClient = this.client.calls.find(c => c.to.channelID === this.interaction.channelId);
		if (!callClient) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.unexpected"))],
			});
			return;
		}

		callClient.hangup(this.interaction);
	}
}
