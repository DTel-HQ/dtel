import Command from "@src/internals/commandProcessor";
import CallClient from "@src/internals/callClient.old";
import { ActionRowBuilder, APIEmbed, BaseMessageOptions, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, MessageComponentInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getFixedT } from "i18next";
import { formatBalance, formatDate, upperFirst } from "@src/internals/utils";
import { client } from "@src/instances/client";
import { Numbers } from "@prisma/client";
import config from "@src/config/config";

export default class Call extends Command {
	async run(): Promise<void> {
		// Since we're in here, we can assume that there's no call in progress
		switch (this.interaction.options.getString("number", true)) {
			case "*233": {
				return this.twoThreeThree();
			}
			case "*411": {
				return this.fourOneOne();
				break;
			}
			default: {
				try {
					Call.call(this.interaction, this.interaction.options.getString("number", true), this.number!);
				} catch {
					// Ignore
				}
			}
		}
	}

	// TODO: Remove fromNum and have this be standalone?
	static async call(interaction: ChatInputCommandInteraction | MessageComponentInteraction, toNum: string, fromNum: Numbers, random = false, alreadyReplied = false): Promise<CallClient> {
		const t = getFixedT(interaction.locale, undefined, `commands.call`);
		if (!alreadyReplied) await interaction.deferReply();

		const callObject = new CallClient(client, {
			from: fromNum.number,

			to: toNum,
			startedBy: interaction.user.id,
			random,
		});

		try {
			await callObject.initiate();
			interaction.editReply({
				embeds: [{
					color: config.colors.info,
					...t("initiated", {
						number: toNum,
						callID: callObject.id,
					}) as APIEmbed,
				}],
			});
		} catch (e) {
			// This works as when we error out in CallClient, we return a translation path instead of an error message
			// Feel free to change it
			if (e instanceof Error) {
				if (e.message === "otherSideInCall") {
					interaction.editReply({
						embeds: [client.errorEmbed(t("errors.otherSideInCall")!)],
					});

					// interaction.editReply({
					// 	embeds: [{
					// 		color: config.colors.info,
					// 		...t("waitPrompt") as APIEmbed,
					// 	}],
					// 	components: [
					// 		new ActionRowBuilder<ButtonBuilder>()
					// 			.addComponents([
					// 				new ButtonBuilder({
					// 					customId: "call-waitAccept",
					// 					label: t("waitAccept")!,
					// 					style: ButtonStyle.Primary,
					// 					emoji: "✅",
					// 				}),
					// 				new ButtonBuilder({
					// 					customId: "call-waitDeny",
					// 					label: t("waitDeny")!,
					// 					style: ButtonStyle.Secondary,
					// 					emoji: "❌",
					// 				}),
					// 			]),
					// 	],
					// });

					// setTimeout(() => {
					// 	interaction.deleteReply().catch(() => null);
					// }, 60000);

					// TODO: Deal with call waiting in some way
				}

				interaction.editReply({
					embeds: [client.errorEmbed(t(`errors.${e.message}`))],
				});
			} else {
				interaction.editReply({
					embeds: [client.errorEmbed(t(`errors.unexpected`))],
				});
			}
		}
		return callObject;
	}

	async twoThreeThree(): Promise<void> {
		const t233 = getFixedT(this.interaction.locale, undefined, "commands.call.twoThreeThree");

		const isVIP = this.number!.vip?.expiry && this.number!.vip?.expiry > new Date();
		const strikeCount = (await this.db.strikes.aggregate({
			where: {
				offender: this.number?.guildID || this.interaction.user.id,
			},
			_count: {
				_all: true,
			},
		}))._count._all;

		const embed = EmbedBuilder.from(this.t("twoThreeThree.baseEmbed", {
			canAfford: this.account!.balance > 500 ? "canAfford" : "cantAfford",
		}) as APIEmbed);
		embed
			.setColor(isVIP ? this.config.colors.yellowbook : this.config.colors.info)
			.setAuthor({
				name: this.interaction.guild?.name || this.interaction.user.username,
				iconURL: this.interaction.guild?.iconURL() || this.interaction.user.displayAvatarURL(),
			});

		embed.addFields([{
			name: this.genericT("number"),
			value: this.number!.number,
			inline: true,
		}, {
			name: t233("expiry"),
			value: formatDate(this.number!.expiry),
			inline: true,
		}, {
			name: t233("credits"),
			value: `${this.config.dtsEmoji} ${formatBalance(this.account!.balance)}`,
			inline: true,
		}, {
			name: t233("isVIP"),
			value: upperFirst(this.genericT(isVIP ? "yes" : "no")),
			inline: true,
		}, {
			name: t233("vipExpiry"),
			value: isVIP ? formatDate(this.number!.vip!.expiry) : this.genericT("notApplicable"),
			inline: true,
		}, {
			name: t233("vipMonths"),
			value: this.account!.vipMonthsRemaining.toString(),
			inline: true,
		}, {
			name: t233("blockedNumbers"),
			value: this.number!.blocked.length.toString(),
			inline: true,
		}, {
			name: t233("mentions"),
			value: this.number!.mentions.length.toString(),
			inline: true,
		}, {
			name: t233("strikes"),
			value: strikeCount.toString(),
			inline: true,
		}]);

		const actionRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setStyle(ButtonStyle.Primary)
					.setCustomId("call-233-open")
					.setLabel(t233("renewNumber"))
					.setEmoji("💸")
					.setDisabled(this.account!.balance < 500),
			);

		this.interaction.reply({
			embeds: [embed],
			components: [actionRow],
			ephemeral: true,
		});
	}
	async fourOneOne(): Promise<void> {
		this.interaction.reply(fourOneOneMainMenu);
	}
}

const mainMenuEmbed = new EmbedBuilder()
	.setColor(config.colors.yellowbook)
	.setTitle("Welcome to the DTel Yellowbook!")
	.setDescription("Please select an option.");

const mainMenuRow = new ActionRowBuilder<StringSelectMenuBuilder>();
mainMenuRow.addComponents([
	new StringSelectMenuBuilder()
		.setCustomId("call-411-selector")
		.setPlaceholder("Options")
		.setOptions([
			new StringSelectMenuOptionBuilder()
				.setLabel("Search")
				.setDescription("Search through the Yellowbook")
				.setEmoji({ name: "🔍" })
				.setValue("search"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Manage")
				.setDescription("Create, edit or delete your Yellowbook entry")
				.setEmoji({ name: "✍️" })
				.setValue("manage"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Special Numbers")
				.setDescription("Find information about our special numbers")
				.setEmoji({ name: "📲" })
				.setValue("special"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Customer Support")
				.setDescription("Call Customer Support")
				.setEmoji({ name: "📞" })
				.setValue("support"),
			new StringSelectMenuOptionBuilder()
				.setLabel("VIP Options")
				.setDescription("Access special VIP options")
				.setEmoji({ name: "🌟" })
				.setValue("vip"),
			new StringSelectMenuOptionBuilder()
				.setLabel("Exit")
				.setDescription("Close this menu")
				.setEmoji({ name: "❌" })
				.setValue("exit"),
		]),
]);

export const fourOneOneMainMenu: BaseMessageOptions = {
	embeds: [mainMenuEmbed],
	components: [mainMenuRow],
};
