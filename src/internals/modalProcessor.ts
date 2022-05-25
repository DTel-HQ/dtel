// File needs a better name

import { ModalSubmitInteraction } from "discord.js";
import DTelClient from "./client";
import Processor from "./processor";
import i18n, { TFunction } from "i18next";
import CommandDataInterface from "../interfaces/commandData";

abstract class ModalProcessor extends Processor {
	interaction: ModalSubmitInteraction;
	t: TFunction;

	constructor(client: DTelClient, interaction: ModalSubmitInteraction, commandData: CommandDataInterface) {
		super(client, interaction, commandData);
		this.interaction = interaction;

		this.t = i18n.getFixedT(interaction.locale, undefined, `commands.${interaction.customId.split("-")[0]}`);
	}
	abstract run(): void;
}
export default ModalProcessor;
