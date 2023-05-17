import { ButtonInteraction } from "discord.js";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class CallPickupButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const callClient = Array.from(this.client.calls.values()).find(c => c.to.channelID === this.interaction.channelId);

		if (!callClient) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.unexpected"))],
			});
			return;
		}

		callClient.pickup(this.interaction);
	}
}
