import Command from "../../internals/commandProcessor";
import discoin, { Currency } from "@discoin/scambio";

import auth from "../../config/auth";
import { formatBalance } from "../../internals/utils";
import { winston } from "../../dtel";
import { EmbedBuilder } from "discord.js";

const dClient = new discoin(auth.discoin.token, ["DTS"]);

export default class DiscoinConvert extends Command {
	async run(): Promise<void> {
		const allCurrencies = await discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC").catch(() => null) as Currency[] | null;

		if (!allCurrencies) {
			winston.warn("[Discoin] Failed to fetch currencies from Discoin API");
			this.interaction.reply({
				embeds: [this.client.errorEmbed("Failed to fetch currencies from Discoin API")],
				ephemeral: true,
			});
			return;
		}

		const dts = allCurrencies.find(c => c.id === "DTS")!;

		const discoinGuild = await this.client.guilds.fetch(this.config.discoin.guildID).catch(() => undefined);
		const emojis = await discoinGuild?.emojis.fetch().catch(() => undefined);

		allCurrencies.splice(allCurrencies.indexOf(dts), 1);

		const embed = new EmbedBuilder()
			.setColor(this.config.colors.info)
			.setTitle("Discoin Currencies")
			.setDescription([
				`\`/convert [3-letter currency code] [amount]\``,
				`See the [docs](${this.config.discoin.guideLink}) or \`/call 0800DISCOIN\` for info.`,
				``,
				`${this.config.dtsEmoji}1 = ${formatBalance(dts.value)} D$`,
			].join("\n"));

		for (const c of allCurrencies) {
			const emoji = emojis?.find(e => e.name === c.id)?.toString() || c.id;

			embed.addFields({
				name: `${emoji} ${c.id} @ ${formatBalance(c.value)} D$`,
				value: `1 ${dts.id} = ${formatBalance(Math.round((dts.value / c.value) * 100) / 100)} [${c.id}](${this.config.discoin.apiEndpoint}/currencies/${c.id}/show "${c.name}")`,
				inline: true,
			});
		}

		this.interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	}
}
