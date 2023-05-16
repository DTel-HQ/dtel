// TODO: Refactor this long long long file
import { Numbers, Phonebook } from "@prisma/client";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ComponentType,
	EmbedBuilder,
	MessageEditOptions,
	ModalBuilder,
	ModalSubmitInteraction,
	StringSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
	InteractionResponse,
	StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
	StringSelectMenuComponent,
} from "discord.js";
import Call from "../../commands/standard/call";
import config from "../../config/config";
import { db } from "../../database/db";
import MessageComponentProcessor from "../../internals/componentProcessor";
import FourOneOneVIP from "../../internals/411/vip";
import { PermissionLevel } from "../../interfaces/commandData";

export default class FourOneOneSelector extends MessageComponentProcessor<StringSelectMenuInteraction> {
	async run(): Promise<void> {
		const selected = this.interaction.values[0];

		switch (selected) {
			case "search": {
				FourOneOneSearch.initialEmbed(this.interaction);
				break;
			}
			case "manage": {
				if (await this.getPerms() < PermissionLevel.serverAdmin) {
					this.interaction.reply({
						ephemeral: true,
						content: "You don't have permission to do this. Contact a server admin to change these settings.",
					});

					return;
				}

				FourOneOneManage.handleInitialInteraction(this.interaction);
				break;
			}
			case "special": {
				this.interaction.reply({
					embeds: [{
						title: "📞 Special numbers",
						description: "This is a list of all currently operational special numbers",
						fields: [{
							name: "*233",
							value: "Displays your number information and lets you recharge the number.",
						}, {
							name: "*411",
							value: "Looks like you've figured that one out already.",
						}, {
							name: "*611",
							value: "Puts you through to DTel's Customer Support team. Please note that **troll-calling will result in you receiving a strike**.",
						}],
					}],
					ephemeral: true,
				});
				break;
			}
			case "support": {
				Call.call(this.interaction, "*611", this.number!);

				break;
			}
			case "vip": {
				const acc = await this.fetchAccount();
				if (await this.getPerms() < PermissionLevel.serverAdmin) {
					this.interaction.reply({
						ephemeral: true,
						content: "You don't have permission to do this. Contact a server admin to change these settings.",
					});

					return;
				}

				// If they can't upgrade and the number isn't VIP
				if (acc.vipMonthsRemaining == 0 && (this.number!.vip && this.number!.vip!.expiry < new Date())) {
					const embed = new EmbedBuilder()
						.setColor(config.colors.yellowbook)
						.setTitle("Upgrade your number")
						.setDescription(`You don't have any VIP months on your account.\nClick [here](${config.vipLink}) for information on buying VIP Months.`)
						.addFields([{
							name: "VIP Perks",
							value: `\
								**[• Disable number recognition](${config.paymentLink})**\
								\nThis will make your number and the names of those speaking hidden from the other side and the public logs in our [server](${config.guildInvite}).\
								\n\n**[• Custom name](${config.paymentLink})**\
								\nYou can set a custom name that will show up next to (or instead of) your number when calling.\
								\n\n**[• VIP Emote](${config.paymentLink})**\
								\nYour messages will have the VIP emote: ${config.callPhones.donator} instead of the default emote: ${config.callPhones.default}\
								\n\n**[• Change your number](${config.paymentLink})**\
								\nRequesting a number change/move (by dialing \`*611\`) won't delete your data.\
								\n\n**[• And more!](${config.paymentLink})**\
								\nSee [the site](${config.vipLink}) for a full list of perks.`,
						}]);

					this.interaction.message!.edit({
						embeds: [embed],
						components: [],
					});

					return;
				}

				FourOneOneVIP.mainMenu(this.interaction);
				break;
			}
			case "exit": {
				this.interaction.message.delete().catch(() => null);
				this.interaction.deferUpdate();
				break;
			}
		}
	}

	// Disable the menu
	static async disableMenu(interaction: StringSelectMenuInteraction): Promise<void> {
		if (!interaction.message.editable) return;
		const origMenuData = interaction.component as StringSelectMenuComponent;
		const optionData = origMenuData.options.find(o => o.value === interaction.values[0])!;

		const newMenu = new StringSelectMenuBuilder()
			.setCustomId("dtelnoreg-411-fake-selector")
			.setDisabled(true)
			.addOptions([
				StringSelectMenuOptionBuilder.from(optionData)
					.setDefault(true),
			]);

		await interaction.message.edit({
			embeds: interaction.message!.embeds,
			components: [new ActionRowBuilder<StringSelectMenuBuilder>().setComponents([newMenu])],
		}).catch(() => null);
	}
}

// TODO: This needs redone when my head is in a better place and I'm not just rushing to make it work.
class FourOneOneSearch {
	static entriesPerPage = 7;

	static async initialEmbed(interaction: StringSelectMenuInteraction | ButtonInteraction): Promise<void> {
		this.page(interaction, 1, null, true);
	}

	static async page(interaction: ButtonInteraction | StringSelectMenuInteraction, page: number, cursor: string | null, next: boolean): Promise<void> {
		const numberOfEntries = await db.phonebook.count();
		interaction.deferUpdate();


		const thisPageEntries = await db.phonebook.findMany({
			orderBy: {
				number: "asc",
			},
			take: (next ? 1 : -1) * this.entriesPerPage,
			skip: cursor ? 1 : 0,
			cursor: cursor ? {
				number: cursor,
			} : undefined,
		});

		const payload = await this.generatePageMessage(numberOfEntries, thisPageEntries, page);

		interaction.message.edit(payload);
	}

	static generatePageMessage(numberOfEntries: number, thisPageEntries: Phonebook[], page: number, customIdPrefix = "call-411-search", clear = false): MessageEditOptions {
		const pageCount = Math.ceil(numberOfEntries / FourOneOneSearch.entriesPerPage);

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("📖 Yellowbook Entries");

		for (const entry of thisPageEntries) {
			embed.addFields({
				name: entry.number,
				value: entry.description,
			});
		}

		if (pageCount > 1) {
			embed.setFooter({
				text: `Page ${page}/${pageCount}`,
			});
		}

		const actionRow = new ActionRowBuilder<ButtonBuilder>();

		if (clear) {
			actionRow.addComponents(new ButtonBuilder()
				.setCustomId(`${customIdPrefix}-clear`)
				.setLabel(`Clear`)
				.setEmoji(`♾️`)
				.setStyle(ButtonStyle.Primary));
		} else {
			actionRow.addComponents(new ButtonBuilder()
				.setCustomId(`${customIdPrefix}-search`)
				.setLabel(`Search`)
				.setEmoji(`🔍`)
				.setStyle(ButtonStyle.Primary));
		}

		if (pageCount > 1) {
			actionRow.addComponents(
				new ButtonBuilder()
				// Send cursor with button
					.setCustomId(`${customIdPrefix}-prev-params-${page - 1}-${thisPageEntries[0].number}`)
					.setLabel("Previous")
					.setEmoji("◀️")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(page === 1),
			);
			actionRow.addComponents(
				new ButtonBuilder()
					.setCustomId(`${customIdPrefix}-next-params-${page + 1}-${thisPageEntries[thisPageEntries.length - 1].number}`)
					.setLabel("Next")
					.setEmoji("▶️")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(page === pageCount),
			);
		}

		actionRow.addComponents(
			new ButtonBuilder()
				.setCustomId(`${customIdPrefix}-exit`)
				.setLabel(`Exit`)
				.setEmoji(`✖️`)
				.setStyle(ButtonStyle.Danger),
		);

		return {
			components: [actionRow],
			embeds: [embed],
		};
	}

	static async handleSearchInteraction(interaction: ModalSubmitInteraction) {
		interaction.deferUpdate();

		const query = interaction.fields.getTextInputValue("search-query");

		let payload: MessageEditOptions;
		try {
			payload = await this.search(query);
		} catch (e) {
			interaction.reply({
				content: "❌ No results found.",
				ephemeral: true,
			});
			return;
		}

		const embed = payload.embeds![0] as EmbedBuilder;

		if (embed.data.footer) {
			embed.data.footer.text += ` - Search: *${query}*`;
		} else {
			embed.setFooter({
				text: `Search: *${query}*`,
			});
		}

		interaction.message!.edit(payload);

		const collector = interaction.message!.createMessageComponentCollector<ComponentType.Button>({
			filter: i => i.customId.startsWith("dtelnoreg-search"),
			idle: 2 * 60 * 1000,
			componentType: ComponentType.Button,
		});

		collector.on("collect", async i => {
			const shortID = i.customId.replace("dtelnoreg-search-", "");

			if (shortID.startsWith("clear")) {
				collector.stop();
				return this.initialEmbed(i);
			} else if (shortID.startsWith("exit")) {
				collector.stop();
				this.exit(i);
			} else if (shortID.startsWith("prev") || shortID.startsWith("next")) {
				i.deferUpdate();
				const params = shortID.split("-params-")[1].split("-");
				const page = parseInt(params[0]);

				payload = await this.search(query, page);

				const e = payload.embeds![0] as EmbedBuilder;
				e.data.footer!.text += ` - Search: *${query}*`;

				await interaction.message!.edit(payload);
			}
		});
	}

	static async search(query: string, page = 1): Promise<MessageEditOptions> {
		const filter = {
			$text: {
				$search: query,
			},
		};

		const numberOfEntries = (await db.$runCommandRaw({
			count: "Phonebook",
			query: filter,
		}) as unknown as rawCount).n;

		const rawResults = await db.phonebook.findRaw({
			filter: {
				...filter,
			},
			options: {
				limit: 7,
				sort: {
					_id: 1,
				},
				skip: (page - 1) * 7,
			},
		}) as unknown as rawSearchRes[];

		const searchResults = rawResults.map(r => ({ number: r._id, description: r.description }));

		if (searchResults.length === 0) throw new Error("No results found");

		return this.generatePageMessage(numberOfEntries, searchResults, page, "dtelnoreg-search", true);
	}

	static async exit(interaction: ButtonInteraction) {
		interaction.message.edit({
			components: [],
		});
	}
}

interface rawCount {
	n: number,
	ok: number,
}
interface rawSearchRes {
	_id: string,
	description: string,
}

class FourOneOneManage {
	static wrongInteractionUserEmbed(interaction: StringSelectMenuInteraction): Promise<InteractionResponse> {
		return interaction.reply({
			ephemeral: true,
			content: "❌ You can't use this menu as you didn't open it.",
		});
	}

	static async handleInitialInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) return this.wrongInteractionUserEmbed(interaction);

		interaction.deferUpdate();

		const thisEntry = await db.numbers.findUnique({
			where: {
				channelID: interaction.channel!.id,
			},
			include: {
				phonebook: true,
			},
		});

		const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>();
		const selectMenu = new StringSelectMenuBuilder()
			.setPlaceholder("Options")
			.setCustomId("call-411-manage-selector");
		actionRow.addComponents(selectMenu);

		if (thisEntry!.phonebook) {
			selectMenu.addOptions(
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `✍️` })
					.setLabel("Edit")
					.setDescription("Edit your Yellowbook entry")
					.setValue("edit"),
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `❌` })
					.setLabel("Delete")
					.setDescription("Remove your number from the Yellowbook")
					.setValue("delete"),
			);
		} else {
			selectMenu.addOptions(
				new StringSelectMenuOptionBuilder()
					.setEmoji({ name: `➕` })
					.setLabel("Add")
					.setDescription("Add your number to the Yellowbook")
					.setValue("add"),
			);
		}

		selectMenu.addOptions(
			new StringSelectMenuOptionBuilder()
				.setEmoji({ name: `⬅️` })
				.setLabel("Back")
				.setDescription("Go back to the Main Menu.")
				.setValue("back"),
		);

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("Manage your DTel Yellowbook")
			.setDescription("Please select an option from the dropdown menu below.");

		interaction.message!.edit({
			components: [actionRow],
			embeds: [embed],
		});
	}

	static handleAddInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) return this.wrongInteractionUserEmbed(interaction);

		FourOneOneSelector.disableMenu(interaction);

		const modal = new ModalBuilder()
			.setCustomId("call-411-manage-add-modal")
			.setTitle("Add your number to the Yellowbook")
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setCustomId("description")
						.setLabel("Description")
						.setMaxLength(200)
						.setMinLength(10)
						.setPlaceholder("Enter a description for your number.")
						.setRequired(true)
						.setStyle(TextInputStyle.Short),
				),
			);

		interaction.showModal(modal);
	}

	static async handleEditInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) return this.wrongInteractionUserEmbed(interaction);

		FourOneOneSelector.disableMenu(interaction);

		let number: Numbers & {
			phonebook: Phonebook | null;
		};

		try {
			number = await db.numbers.findUniqueOrThrow({
				where: {
					channelID: interaction.channel!.id,
				},
				include: {
					phonebook: true,
				},
			});
		} catch {
			interaction.reply({
				content: "Something went wrong. Please try again.",
				ephemeral: true,
			});
			return;
		}

		const modal = new ModalBuilder()
			.setCustomId("call-411-manage-edit-modal")
			.setTitle("Add your number to the Yellowbook")
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setCustomId("description")
						.setLabel("Description")
						.setMaxLength(200)
						.setMinLength(10)
						.setPlaceholder("Enter a description for your number. (This will be seen by other users)")
						.setRequired(true)
						.setValue(number!.phonebook!.description)
						.setStyle(TextInputStyle.Short),
				),
			);

		interaction.showModal(modal);
	}
	static handleDeleteInteraction(interaction: StringSelectMenuInteraction) {
		if (interaction.message.interaction?.user.id != interaction.user.id) return this.wrongInteractionUserEmbed(interaction);

		interaction.deferUpdate();

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("⚠️ Are you sure?")
			.setDescription("Remove your number from the Yellowbook?");

		const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("call-411-manage-delete-confirm")
				.setEmoji("✔️")
				.setLabel("Confirm")
				.setStyle(ButtonStyle.Danger),
			new ButtonBuilder()
				.setCustomId("call-411-manage-delete-cancel")
				.setEmoji("❌")
				.setLabel("Cancel")
				.setStyle(ButtonStyle.Secondary),
		);

		interaction.message.edit({
			embeds: [embed],
			components: [actionRow],
		});
	}
}

export { FourOneOneSearch, FourOneOneManage as FourOneOneEdit };
