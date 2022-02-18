// File needs a better name

import { MessageComponentInteraction } from "discord.js";
import DTelClient from "./client";
import Processor from "./processor";

abstract class ComponentProcessor extends Processor {
	interaction: MessageComponentInteraction;
	constructor(client: DTelClient, interaction: MessageComponentInteraction) {
		super(client, interaction);
		this.interaction = interaction;
	}
	abstract run(): void;
}
export default ComponentProcessor;
