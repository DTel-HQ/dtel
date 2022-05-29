import { Numbers } from "@prisma/client";
import { MessageActionRow, MessageButton, MessageEmbedOptions } from "discord.js";
import Command from "../../internals/commandProcessor";

// If someone could look over the complexity of this command and try to lower it that'd be helpful.

export default class Wizard extends Command {
	async run(): Promise<void> {
		let number: Numbers | null = null;

		if (!number && this.interaction.guild) {
			const guildConf = await this.db.guildConfigs.findUnique({
				where: {
					id: this.interaction.guild.id,
				},
				include: {
					numbers: true,
				},
			});


			if (!guildConf?.whitelisted) {
				if (guildConf?.numbers?.length && guildConf?.numbers?.length > 0) {
					number = guildConf.numbers[0];
				} else {
					number = await this.db.numbers.findFirst({
						where: {
							guildID: this.interaction.guild.id,
						},
					});
				}

				if (number && number.channelID !== this.interaction.channelId) {
					return this.interaction.reply({
						embeds: [this.client.errorEmbed(this.t("errors.unwhitelistedGuildHasNumber", { number: number.number }))],
					});
				}
			} else {
				number = null;
			}
		}

		if (number) {
			return this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.channelHasNumber", { number: number.number }))],
			});
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.yellowbook,

				...this.t("introEmbed") as MessageEmbedOptions,
			}],
			components: [
				new MessageActionRow().addComponents(new MessageButton().setLabel("I'm ready!").setCustomId("wizard-ready").setEmoji("✔️").setStyle("PRIMARY")),
			],
		});
	}
}
