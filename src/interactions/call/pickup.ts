import { ButtonInteraction } from "discord.js";
import MessageComponentProcessor from "@src/internals/componentProcessor";
import { handlePickupCallInteraction } from "@src/internals/calls/pickup/HandlePickupCallInteraction";

export default class CallPickupButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		return handlePickupCallInteraction(this.interaction);
	}
}
