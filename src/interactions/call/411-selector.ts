import { Phonebook } from "@prisma/client";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentType, EmbedBuilder, MessageEditOptions, ModalSubmitInteraction, SelectMenuBuilder, SelectMenuComponent, SelectMenuInteraction, SelectMenuOptionBuilder } from "discord.js";
import Call from "../../commands/standard/call";
import config from "../../config/config";
import { db } from "../../database/db";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class FourOneOneSelector extends MessageComponentProcessor<SelectMenuInteraction> {
	async run(): Promise<void> {
		const selected = this.interaction.values[0];

		switch (selected) {
			case "search": {
				this.search();
				break;
			}
			case "edit": {
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
				break;
			}
			case "exit": {
				this.interaction.message.delete().catch(() => null);
				break;
			}
		}
	}

	// Disable the menu
	async disableMenu(): Promise<void> {
		if (this.interaction.message.editable) {
			const origMenuData = this.interaction.component as SelectMenuComponent;
			const optionData = origMenuData.options.find(o => o.value === this.interaction.values[0])!;

			const newMenu = new SelectMenuBuilder()
				.setCustomId("dtelnoreg-411-fake-selector")
				.setDisabled(true)
				.addOptions([
					SelectMenuOptionBuilder.from(optionData)
						.setDefault(true),
				]);

			await this.interaction.message.edit({
				embeds: this.interaction.message!.embeds,
				components: [new ActionRowBuilder<SelectMenuBuilder>().setComponents([newMenu])],
			}).catch(() => null);
		}
	}

	async search(): Promise<void> {
		FourOneOneSearch.initialEmbed(this.interaction);
	}
}

// TODO: Perhaps make not static?
// Regardless, this needs redone when my head is in a better place and I'm not just rushing to make it work.
class FourOneOneSearch {
	static entriesPerPage = 7;

	static async initialEmbed(interaction: SelectMenuInteraction | ButtonInteraction): Promise<void> {
		this.page(interaction, 1, null, true);
	}

	static async page(interaction: ButtonInteraction | SelectMenuInteraction, page: number, cursor: string | null, next: boolean): Promise<void> {
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
				.setEmoji(`❌`)
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
		embed.data.footer!.text += ` - Search: *${query}*`;

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


export { FourOneOneSearch };
