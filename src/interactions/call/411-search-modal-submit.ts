import ModalProcessor from "@src/internals/modalProcessor";
import { FourOneOneSearch } from "./411-selector";

export default class Call411SearchModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		await FourOneOneSearch.handleSearchInteraction(this.interaction);
	}
}
