// Not stolen code
// © SunburntRock89 2021
// © theLMGN 2021
// But not actually copyright do what you want

import { CommandInteraction } from "discord.js";
import CommandDataInterface from "../interfaces/commandData";
import DTelClient from "./client";
import Processor from "./processor";
import i18n, { TFunction } from "i18next";

abstract class CommandProcessor extends Processor {
	commandData: CommandDataInterface;
	interaction: CommandInteraction;
	t: TFunction;

	constructor(client: DTelClient, interaction: CommandInteraction, commandData: CommandDataInterface) {
		super(client, interaction, commandData);
		this.interaction = interaction;
		this.commandData = commandData;

		this.t = i18n.getFixedT(interaction.locale, null, `commands.${interaction.commandName}`);
	}

	_run(): void {
		if (this.interaction.guild) {
			if (this.checkPermissions() || this.client.config.maintainers.includes(this.interaction.user.id)) this.run();
			else this.permCheckFail();
		} else if (this.commandData.guildOnly) {
			return this.guildOnly();
		} else {
			return this.run();
		}
	}
}
export default CommandProcessor;
