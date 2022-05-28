import MessageComponentProcessor from "../../internals/componentProcessor";
import { t } from "i18next";

export default class CallPickupButton extends MessageComponentProcessor {
	async run(): Promise<void> {
		const callClient = this.client.calls.find(c => c.to.channelID === this.interaction.channelId);
		if (!callClient) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(t("errors.unexpected", { lng: this.interaction.locale }))],
			});
			return;
		}

		callClient.pickup(this.interaction, this.interaction.user.id);
	}
}
