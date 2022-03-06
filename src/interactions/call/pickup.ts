import ModalProcessor from "../../internals/modalProcessor";
import { t } from "i18next";

export default class CallPickupButton extends ModalProcessor {
	async run(): Promise<void> {
		const callClient = this.client.calls.find(c => c.to.channelID === this.interaction.channel.id);
		if (!callClient) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(t("errors.unexpected", { lng: this.interaction.locale }))],
			});
			return;
		}

		callClient.pickup(this.interaction.user.id);
	}
}
