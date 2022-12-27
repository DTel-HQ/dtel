// File needs a better name

import i18n, { TFunction } from "i18next";

import DTelClient from "./client";
import Processor from "./processor";
import CommandDataInterface from "../interfaces/commandData";
import { MessageComponentInteraction } from "discord.js";

abstract class ComponentProcessor<T extends MessageComponentInteraction> extends Processor<T> {
	interaction: T;
	t: TFunction;

	constructor(client: DTelClient, interaction: T, commandData: CommandDataInterface) {
		super(client, interaction, commandData);
		this.interaction = interaction;

		this.t = i18n.getFixedT(interaction.locale, undefined, `commands.${interaction.customId.split("-")[0]}`);
	}
	abstract run(): void;
}
export default ComponentProcessor;
