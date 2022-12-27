import ModalProcessor from "../../internals/modalProcessor";
import { FourOneOneSearch } from "./411-selector";

export default class Call411SearchModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		FourOneOneSearch.handleSearchInteraction(this.interaction);
	}
}
