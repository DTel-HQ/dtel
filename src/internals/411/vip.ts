import { Numbers } from "@prisma/client";
import { ActionRowBuilder, BaseMessageOptions, EmbedBuilder, ModalBuilder, ModalSubmitInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { db } from "../../database/db";
import { client } from "../../dtel";
import config from "../../config/config";
import { fetchNumber, getOrCreateAccount } from "../utils";
import { getFixedT } from "i18next";
import dayjs from "dayjs";
import { fourOneOneMainMenu } from "../../commands/standard/call";

class FourOneOneVIP {
	static makeMenuEmbed(number: Numbers, settingsChanged = false): BaseMessageOptions {
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
			selectMenu.addOptions([
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
			]);
		}

		selectMenu.addOptions(
			new StringSelectMenuOptionBuilder()
				.setEmoji({ name: `⬅️` })
				.setLabel("Back")
				.setDescription("Go back to the Main Menu.")
				.setValue("back"),
		);

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook);

		if (settingsChanged) {
			embed
				.setTitle("✅ VIP Settings")
				.setDescription("Your settings have been updated.")
				.setFooter({
					text: "Please select an option from the dropdown menu below.",
				});
		} else {
			embed
				.setTitle("VIP Settings")
				.setDescription("Please select an option from the dropdown menu below.");
		}

		if (number.vip) {
			embed.addFields({
				name: "Display Name",
				value: number.vip!.name || "None",
				inline: true,
			}, {
				name: "Caller ID Hidden?",
				value: number.vip!.hidden ? "✅ Yes" : "❌ No",
				inline: true,
			}, {
				name: "Expiration Date",
				value: dayjs(number.vip!.expiry).format("YYYY-MM-DD"),
			});
		}

		return {
			components: [actionRow],
			embeds: [embed],
		};
	}

	static async mainMenu(interaction: StringSelectMenuInteraction) {
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

		interaction.message!.edit(this.makeMenuEmbed(number));
	}

	static async handleSelectorSelectionInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) {
			interaction.reply({
				ephemeral: true,
				content: "❌ You can't use this menu as you didn't open it.",
			});

			return;
		}

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
			case "back": {
				interaction.deferUpdate();
				interaction.message.edit(fourOneOneMainMenu);
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

	static async hideCallerIDSelector(interaction: StringSelectMenuInteraction) {
		const value = interaction.values[0];

		await interaction.deferUpdate();

		const hidden = value === "hide";

		const number = await db.numbers.update({
			where: {
				channelID: interaction.channelId!,
			},
			data: {
				vip: {
					upsert: {
						set: {
							hidden,
							name: "",
							expiry: new Date(0),
						},
						update: {
							hidden,
						},
					},
				},
			},
		});

		interaction.message!.edit(this.makeMenuEmbed(number, true));
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

		const dateSeed = number.vip && number.vip.expiry > new Date() ? number.vip?.expiry : new Date();

		number = await db.numbers.update({
			where: {
				number: number.number,
			},
			data: {
				vip: {
					set: {
						expiry: dayjs(dateSeed).add(selected, "month").toDate(), // Copilot gave this so I'll use it
					},
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
		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("VIP Anonymous Mode")
			.setDescription("Anonymous Mode hides your number (if you don't have a custom name set) when you call others. It will also hide your name when you send in a call.\n*Abuse of this system will not be tolerated*")
			.setFooter({
				text: "Please select an option from the dropdown menu below.",
			});

		const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>();
		actionRow.addComponents([
			new StringSelectMenuBuilder().addOptions([
				new StringSelectMenuOptionBuilder()
					.setEmoji("❗")
					.setLabel("Show")
					.setDescription(`Displays your name/number when you call others`)
					.setValue("show"),
				new StringSelectMenuOptionBuilder()
					.setEmoji("🤫")
					.setLabel("Hide")
					.setDescription(`Anonymises your messages when you call others.`)
					.setValue("hide"),
			]).setCustomId("call-411-vip-hide-selector").setPlaceholder("Hide Caller Details?"),
		]);

		interaction.deferUpdate();
		interaction.message!.edit({
			embeds: [embed],
			components: [actionRow],
		});
	}

	static async handleSelectorCustomNameSelectionInteraction(interaction: StringSelectMenuInteraction) {
		const number = await fetchNumber(interaction.channelId);

		const textInput = new TextInputBuilder()
			.setCustomId("name")
			.setPlaceholder("Display Name")
			.setLabel("Display Name (Leave blank to remove)")
			.setStyle(TextInputStyle.Short)
			.setMinLength(4)
			.setMaxLength(25)
			.setRequired(false);

		if (number!.vip!.name.length != 0) {
			textInput.setValue(number!.vip!.name);
		}

		const modal = new ModalBuilder()
			.setTitle("VIP Custom Name")
			.setCustomId("call-411-vip-customname-modal-submit")
			.setComponents([
				new ActionRowBuilder<TextInputBuilder>().addComponents([
					textInput,
				]),
			]);

		interaction.showModal(modal);
	}

	static async customNameModalSubmit(interaction: ModalSubmitInteraction) {
		let customName = interaction.fields.getTextInputValue("name");

		if (customName == "") customName = "";

		const numberDoc = await db.numbers.update({
			where: {
				channelID: interaction.channelId!,
			},
			data: {
				vip: {
					upsert: {
						set: {
							name: "",
							hidden: false,
							expiry: new Date(0),
						},
						update: {
							name: customName,
						},
					},
				},
			},
		});

		interaction.deferUpdate();

		interaction.message!.edit(this.makeMenuEmbed(numberDoc, true));
	}
}

export default FourOneOneVIP;
