import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, Interaction, SelectMenuBuilder, SelectMenuComponent, SelectMenuInteraction, SelectMenuOptionBuilder } from "discord.js";
import config from "../../config/config";
import { db } from "../../database/db";
import MessageComponentProcessor from "../../internals/componentProcessor";

export default class FourOneOneSelector extends MessageComponentProcessor {
	interaction = this.interaction as SelectMenuInteraction;

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
				break;
			}
			case "support": {
				break;
			}
			case "vip": {
				break;
			}
			case "exit": {
				this.interaction.deleteReply().catch(() => null);
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


class FourOneOneSearch {
	static entriesPerPage = 7;

	static async initialEmbed(interaction: SelectMenuInteraction): Promise<void> {
		this.page(interaction, 1, null, true);
	}

	static async page(interaction: ButtonInteraction | SelectMenuInteraction, page: number, cursor: string | null, next: boolean): Promise<void> {
		const numberOfEntries = await db.phonebook.count();
		interaction.deferUpdate();

		const pageCount = Math.ceil(numberOfEntries / FourOneOneSearch.entriesPerPage);

		const embed = new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setTitle("📖 Yellowbook Entries");

		const thisPageEntries = await db.phonebook.findMany({
			orderBy: {
				number: "asc",
			},
			take: (next ? 1 : -1) * this.entriesPerPage,
			skip: 1,
			cursor: cursor ? {
				number: cursor,
			} : undefined,
		});

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

		actionRow.addComponents(new ButtonBuilder()
			.setCustomId(`call-411-search-search`)
			.setLabel(`Search`)
			.setEmoji(`🔍`)
			.setStyle(ButtonStyle.Primary));

		if (pageCount > 1) {
			actionRow.addComponents(
				new ButtonBuilder()
					// Send cursor with button
					.setCustomId(`call-411-search-prev-params-${page - 1}-${thisPageEntries[0].number}`)
					.setLabel("Previous")
					.setEmoji("◀️")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(page === 1),
			);
			actionRow.addComponents(
				new ButtonBuilder()
					.setCustomId(`call-411-search-next-params-${page + 1}-${thisPageEntries[thisPageEntries.length - 1].number}`)
					.setLabel("Next")
					.setEmoji("▶️")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(page === pageCount),
			);
		}

		actionRow.addComponents(
			new ButtonBuilder()
				.setCustomId(`call-411-search-exit`)
				.setLabel(`Exit`)
				.setEmoji(`❌`)
				.setStyle(ButtonStyle.Danger),
		);

		interaction.message.edit({ embeds: [embed], components: [actionRow] });
	}
}

export { FourOneOneSearch };
