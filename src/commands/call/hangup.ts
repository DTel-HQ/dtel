import { hangupCallByNumber } from "@src/internals/calls/hangup/HangupCallByNumber";
import Command from "@src/internals/commandProcessor";

export default class HangUp extends Command {
	async run(): Promise<void> {
		// TODO: Properly type this.number
		if (!this.number) {
			console.warn("Number not found in command requiring number 'hangup'");
			return;
		}

		await hangupCallByNumber(this.number, this.interaction);
	}
}
