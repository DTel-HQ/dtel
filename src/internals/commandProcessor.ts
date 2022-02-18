// Not stolen code
// © SunburntRock89 2021
// © theLMGN 2021
// But not actually copyright do what you want

import { CommandInteraction } from "discord.js";
import CommandInterface from "../interfaces/commandData";
import DTelClient from "./client";
import Processor from "./processor";

abstract class CommandProcessor extends Processor {
	commandData: CommandInterface;
	interaction: CommandInteraction;

	constructor(client: DTelClient, interaction: CommandInteraction, commandData: CommandInterface) {
		super(client, interaction);
		this.interaction = interaction;
		this.commandData = commandData;
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
