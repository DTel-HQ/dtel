import FourOneOneVIP from "../../internals/411/vip";
import ModalProcessor from "../../internals/modalProcessor";

export default class Call411VIPCustomNameModal extends ModalProcessor {
	async run(): Promise<void> {
		FourOneOneVIP.customNameModalSubmit(this.interaction);
	}
}
