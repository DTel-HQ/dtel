// This deviates so far from Novus FM that this may as well be classified as new code
import { ChatInputCommandInteraction } from "discord.js";
import CommandDataInterface from "../interfaces/commandData";
import DTelClient from "./client";
import Processor from "./processor";
import i18n, { TFunction } from "i18next";

abstract class CommandProcessor extends Processor<ChatInputCommandInteraction> {
	commandData: CommandDataInterface;
	interaction: ChatInputCommandInteraction;
	t: TFunction;

	constructor(client: DTelClient, interaction: ChatInputCommandInteraction, commandData: CommandDataInterface) {
		super(client, interaction, commandData);
		this.interaction = interaction;
		this.commandData = commandData;

		this.t = i18n.getFixedT(interaction.locale, undefined, `commands.${interaction.commandName}`);
	}

	async _run(): Promise<void> {
		// Maybe this should be moved into the event handler?
		if (this.interaction.guild && (!this.checkPermissions() && !this.client.config.maintainers.includes(this.interaction.user.id))) {
			await this.permCheckFail();
			return;
		} else if (this.commandData.guildOnly && !this.interaction.guild) {
			await this.guildOnly();
			return;
		}

		await super._run();
	}
}
export default CommandProcessor;
