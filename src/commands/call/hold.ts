import Command from "../../internals/commandProcessor";
export default class Hold extends Command {
	async run(): Promise<void> {
		this.call!.putOnHold(this.interaction);
	}
}
