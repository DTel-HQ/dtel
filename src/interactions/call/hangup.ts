import { ButtonInteraction } from "discord.js";
import MessageComponentProcessor from "@src/internals/componentProcessor";
import { calls } from "@src/instances/calls";
import { handleHangupCallInteraction } from "@src/internals/calls/hangup/HandleHangupCallInteraction";

export default class CallHangupButton extends MessageComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		return handleHangupCallInteraction(this.interaction);
	}
}
