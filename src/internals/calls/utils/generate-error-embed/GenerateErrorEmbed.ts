import config from "@src/config/config";
import { APIEmbed, EmbedBuilder } from "discord.js";

export const generateErrorEmbed = (description: string, options?: APIEmbed): EmbedBuilder =>
	new EmbedBuilder(options)
		.setColor(config.colors.error)
		.setTitle("❌ Error!")
		.setDescription(description);
