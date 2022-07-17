import { Numbers } from "@prisma/client";
import { ActionRowBuilder, ButtonBuilder, APIEmbed, ButtonStyle } from "discord.js";
import Command from "../../internals/commandProcessor";

// If someone could look over the complexity of this command and try to lower it that'd be helpful.

export default class Wizard extends Command {
	async run(): Promise<void> {
		const number: Numbers | null = await this.fetchNumber();

		if (number) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("errors.channelHasNumber", { number: number.number }))],
				ephemeral: true,
			});
			return;
		}

		if (this.interaction.guild) {
			const guildConf = await this.db.guildConfigs.findUnique({
				where: {
					id: this.interaction.guild.id,
				},
				include: {
					numbers: true,
				},
			});


			if (!guildConf?.whitelisted) {
				let numberCount = 0;
				if (guildConf?.numbers?.length) {
					numberCount = guildConf?.numbers?.length;
				} else {
					numberCount = (await this.db.numbers.aggregate({
						where: {
							guildID: this.interaction.guild.id,
						},
						_count: {
							number: true,
						},
					}))._count.number;
				}

				console.log(numberCount);
				if (numberCount >= this.config.maxNumbers) {
					this.interaction.reply({
						embeds: [this.client.errorEmbed(this.t("errors.unwhitelistedGuildHasTooManyNumbers"))],
						ephemeral: true,
					});
					return;
				}
			}
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.yellowbook,

				...this.t("introEmbed") as APIEmbed,
			}],
			components: [
				new ActionRowBuilder<ButtonBuilder>()
					.addComponents(new ButtonBuilder()
						.setLabel("I'm ready!")
						.setCustomId("wizard-ready")
						.setEmoji("✔️")
						.setStyle(ButtonStyle.Primary)),
			],
		});
	}
}
