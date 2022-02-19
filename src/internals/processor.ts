// File needs a better name

import { CommandInteraction, MessageComponentInteraction, ModalSubmitInteraction } from "discord.js";
import DTelClient from "./client";
import config from "../config/config";
import CommandDataInterface from "../interfaces/commandData";
import { DTelNumber } from "../database/schemas/number";

type ChannelBasedInteraction = CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

abstract class Processor {
	config = config;

	client: DTelClient;
	interaction: ChannelBasedInteraction;
	commandData: CommandDataInterface;
	number: DTelNumber;


	constructor(client: DTelClient, interaction: ChannelBasedInteraction, commandData: CommandDataInterface) {
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

	abstract run(): void;

	async _run(): Promise<void> {
		if (this.commandData.numberRequired) {
			this.number = await this.client.db.numbers.findOne({ channel: this.interaction.channel.id });
		}
		this.run();
	}

	notMaintainer(): void {
		this.interaction.reply({
			embeds: [{
				color: 0xFF0000,
				title: ":x: No permission!",
				description: "You must be a maintainer to execute this command!",
			}],
		});
	}

	guildOnly(): void {
		this.interaction.reply({
			embeds: [this.client.errorEmbed("This command can only be ran in a server!")],
		});
	}
}
export default Processor;
