import { Numbers } from "@prisma/client";
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { db } from "../../database/db";
import { client } from "../../dtel";
import config from "../../config/config";
import { fetchNumber, getOrCreateAccount } from "../utils";
import { getFixedT } from "i18next";
import dayjs from "dayjs";

class FourOneOneVIP {
	static async handleInitialInteraction(interaction: StringSelectMenuInteraction) {
		interaction.deferUpdate();

		let number: Numbers;
		try {
			number = await db.numbers.findUniqueOrThrow({
				where: {
					channelID: interaction.channelId,
				},
			});
		} catch {
			interaction.message.edit({
				embeds: [client.errorEmbed("An unexpected error occurred. Please try again")],
				components: [],
			});
			return;
		}

		const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>();
		const selectMenu = new StringSelectMenuBuilder()
			.setPlaceholder("Options")
			.setCustomId("call-411-vip-selector");
		actionRow.addComponents(selectMenu);

		if (!number.vip || number.vip?.expiry < new Date()) {
			selectMenu.addOptions(
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `⬆️` })
					.setLabel("Upgrade")
					.setDescription("Make your number a VIP number")
					.setValue("upgrade"),
			);
		} else {
			selectMenu.addOptions(
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `🤫` })
					.setLabel("Hide")
					.setDescription("Prevent your number from showing when you call others")
					.setValue("hide"),
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `📛` })
					.setLabel("Custom Name")
					.setDescription("Show a custom name when you call someone")
					.setValue("custom"),
			);
		}

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("VIP Settings")
			.setDescription("Please select an option from the dropdown menu below.");

		interaction.message!.edit({
			components: [actionRow],
			embeds: [embed],
		});
	}

	static async handleSelectorSelectionInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) {
			interaction.reply({
				ephemeral: true,
				content: "❌ You can't use this menu as you didn't open it.",
			});

			return;
		}

		console.log(interaction.values[0]);
		switch (interaction.values[0]) {
			case "upgrade": {
				interaction.deferUpdate();
				return this.handleSelectorUpgradeSelectionInteraction(interaction);
			}
			case "hide": {
				return this.handleSelectorHideSelectionInteraction(interaction);
			}
			case "custom": {
				return this.handleSelectorCustomNameSelectionInteraction(interaction);
			}
		}
	}

	static async handleSelectorUpgradeSelectionInteraction(interaction: StringSelectMenuInteraction) {
		const genericT = getFixedT(interaction.locale, undefined, "generic");

		const account = await getOrCreateAccount(interaction.user.id);
		const number = (await fetchNumber(interaction.channelId))!;

		const canAffordUpgrade = account!.vipMonthsRemaining > 0;
		const numberIsVIP = number.vip && number.vip?.expiry > new Date();

		if (canAffordUpgrade && !numberIsVIP) {
			const monthSelectorOptions: StringSelectMenuOptionBuilder[] = [];
			// For up to 12 months
			for (let i = 1; i <= 12; i++) {
				if (i > account.vipMonthsRemaining) break;

				const cost = config.renewalRate * i;
				if (cost > account.balance) break;

				const option = new StringSelectMenuOptionBuilder()
					.setLabel(genericT("month", {
						count: i,
						lng: interaction.locale,
					}))
					.setValue(`${i}`);

				monthSelectorOptions.push(option);
			}

			const embed = new EmbedBuilder()
				.setColor(config.colors.yellowbook)
				.setTitle("VIP Upgrade")
				.setDescription("Please select the length of your VIP experience from the dropdown menu below.");

			interaction.message!.edit({
				components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([
					new StringSelectMenuBuilder()
						.setCustomId("call-411-vip-upgrade-length")
						.setPlaceholder("VIP Length")
						.addOptions(monthSelectorOptions),
				])],
				embeds: [embed],
			});
		}
	}

	static async handleUpgradeLengthSelectionInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) {
			interaction.reply({
				ephemeral: true,
				content: "❌ You can't use this menu as you didn't open it.",
			});

			return;
		}

		interaction.deferUpdate();

		let account = await getOrCreateAccount(interaction.user.id);
		let number = (await fetchNumber(interaction.channelId))!;

		const selected = Number(interaction.values[0]);

		if (selected > account.vipMonthsRemaining) {
			interaction.message!.edit({
				components: [],
				embeds: [client.errorEmbed("Something went wrong. Please try again.")],
			});
			return;
		}

		const newMonthsRemaining = account.vipMonthsRemaining - selected;

		account = await db.accounts.update({
			where: {
				id: account.id,
			},
			data: {
				vipMonthsRemaining: newMonthsRemaining,
			},
		});

		number = await db.numbers.update({
			where: {
				number: number.number,
			},
			data: {
				vip: {
					expiry: dayjs().add(selected, "month").toDate(), // Copilot gave this so I'll use it
					hidden: false,
					name: "",
				},
			},
		});

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setTitle("VIP Upgrade Receipt")
			.setDescription(`You have successfully upgraded your number to VIP for ${selected} month${selected === 1 ? "" : "s"}.`)
			.addFields([{
				name: "Number",
				value: number.number,
				inline: true,
			}, {
				name: "Expiration Date",
				value: dayjs(number.expiry).format("YYYY-MM-DD"),
				inline: true,
			}, {
				name: "Donator Months Remaining",
				value: `${account.vipMonthsRemaining} month${account.vipMonthsRemaining === 1 ? "" : "s"}`,
			}, {
				name: "VIP Options",
				value: "Dial `*411` again to manage your VIP settings.",
			}]);

		await interaction.message.edit({
			components: [],
			embeds: [embed],
		});
	}

	static handleSelectorHideSelectionInteraction(interaction: StringSelectMenuInteraction) {
		// TODO: IMPLEMENT
	}

	static async handleSelectorCustomNameSelectionInteraction(interaction: StringSelectMenuInteraction) {
		const number = await fetchNumber(interaction.channelId);

		const modal = new ModalBuilder()
			.setTitle("VIP Custom Name")
			.setCustomId("call-411-vip-customname")
			.setComponents([
				new ActionRowBuilder<TextInputBuilder>().addComponents([
					new TextInputBuilder()
						.setCustomId("name")
						.setPlaceholder("Display Name")
						.setLabel("Display Name")
						.setStyle(TextInputStyle.Short)
						.setMinLength(0)
						.setRequired(true)
						.setValue(number?.vip?.name || ""),
				]),
			]);

		interaction.showModal(modal);
	}
}

export default FourOneOneVIP;
