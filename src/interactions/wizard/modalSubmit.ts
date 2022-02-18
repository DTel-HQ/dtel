import ModalProcessor from "../../internals/modalProcessor";

export default class WizardModalSubmit extends ModalProcessor {
	async run(): Promise<void> {
		// TOOD: Modify interaction handler to support this weird type
		this.interaction.locale
		const number = this.interaction.fields.getTextInputValue("wizardNumber");
		if (isNaN(Number(number))) {
			this.interaction.reply("Please enter a valid phone number.");
			return;
		}
	}
}
