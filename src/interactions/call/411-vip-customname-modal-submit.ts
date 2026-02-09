import FourOneOneVIP from "@src/internals/411/vip";
import ModalProcessor from "@src/internals/modalProcessor";

export default class Call411VIPCustomNameModal extends ModalProcessor {
	async run(): Promise<void> {
		await FourOneOneVIP.customNameModalSubmit(this.interaction);
	}
}
