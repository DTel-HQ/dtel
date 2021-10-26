// Not stolen code
// © SunburntRock89 2021
// © theLMGN 2021
// But not actually copyright do what you want

import { CommandInteraction } from "discord.js";
import CommandInterface from "../Interfaces/Command";
import DTelClient from "../internals/client";

class Command {
	client: DTelClient;
	interaction: CommandInteraction;
	commandData: CommandInterface;

	constructor(client: DTelClient, interaction: CommandInteraction, commandData: CommandInterface) {
		this.client = client;
		this.interaction = interaction;
		this.commandData = commandData;
	}

	checkPermissions(): boolean {
		return true;
	}

	permCheckFail(): void {
		this.interaction.reply({
			ephemeral: true,
			embeds: [{
				color: 0xFF0000,
				title: ":x: No permission!",
				description: "You do not have permission run do this.\nGet someone with the `MANAGE_SERVER` permission to run it for you.",
			}],
		});
	}

	run(): void {
		return null;
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

	notMaintainer(): void {
		this.interaction.reply({
			embeds: [{
				color: 0xFF0000,
				title: "❌ Error!",
				description: "You must be a maintainer to execute this command!",
			}],
		});
	}

	guildOnly(): void {
		this.interaction.reply({
			embeds: [{
				color: 0xFF0000,
				title: "❌ Error!",
				description: "This command can only be ran in a server!",
			}],
		});
	}
}
export default Command;
