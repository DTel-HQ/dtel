import Command from "../../internals/commandProcessor";

export default class HangUp extends Command {
	async run(): Promise<void> {
		this.call!.hangup(this.interaction);
	}
}
