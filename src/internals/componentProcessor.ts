// File needs a better name

import { MessageComponentInteraction } from "discord.js";
import i18n, { TFunction } from "i18next";

import DTelClient from "./client";
import Processor from "./processor";
import CommandDataInterface from "../interfaces/commandData";

abstract class ComponentProcessor extends Processor {
	interaction: MessageComponentInteraction;
	t: TFunction;

	constructor(client: DTelClient, interaction: MessageComponentInteraction, commandData: CommandDataInterface) {
		super(client, interaction, commandData);
		this.interaction = interaction;

		this.t = i18n.getFixedT(interaction.locale, null, `commands.${interaction.customId.split("-")[0]}`);
	}
	abstract run(): void;
}
export default ComponentProcessor;
