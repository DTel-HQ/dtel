import { ButtonInteraction } from "discord.js";
import MessageComponentProcessor from "../../internals/componentProcessor";
import { calls } from "../../dtel";

export default class CallPickupButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const callClient = Array.from(calls.values()).find(c => c.to.channelID === this.interaction.channelId);

		if (!callClient) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.unexpected"))],
			});
			return;
		}

		callClient.pickup(this.interaction);
	}
}
