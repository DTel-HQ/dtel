import Command from "../../internals/commandProcessor";
import discoin from "@discoin/scambio";

import auth from "../../config/auth";
import { Transaction } from "@discoin/scambio/tsc_output/src/structures/transactions";
import { formatBalance } from "../../internals/utils";

const dClient = new discoin(auth.discoin.token, ["DTS"]);

export default class DiscoinConvert extends Command {
	async run(): Promise<void> {
		const currency = this.interaction.options.getString("currency", true);
		const amount = this.interaction.options.getInteger("amount", true);

		if (amount > this.account!.balance) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("You can't afford that transaction!")],
				ephemeral: true,
			});
			return;
		}

		this.interaction.deferReply({ ephemeral: true });

		const discoinGuild = await this.client.guilds.fetch(this.config.discoin.guildID).catch(() => undefined);
		const emojis = await discoinGuild?.emojis.fetch().catch(() => undefined);

		let conversion: Transaction;
		try {
			conversion = await dClient.transactions.create({
				from: "DTS",
				to: currency,
				amount,
				user: this.interaction.user.id,
			});
		} catch {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("An error occurred while processing your transaction. No money has been taken from your account.")],
				ephemeral: true,
			});
			return;
		}

		await this.db.accounts.update({
			where: {
				id: this.interaction.user.id,
			},
			data: {
				balance: {
					increment: amount,
				},
			},
		});

		const emoji = emojis?.find(e => e.name === currency)?.toString() || currency;

		this.interaction.editReply({
			embeds: [{
				color: this.config.colors.receipt,
				author: {
					name: this.interaction.user.tag,
					icon_url: this.interaction.user.displayAvatarURL(),
				},
				title: "Converted!",
				description: [
					`Successfully converted ${this.config.dtsEmoji} ${amount} into ${emoji} ${formatBalance(conversion.payout)}.`,
					`You may track your transaction [here](${this.config.discoin.apiEndpoint}/transactions/${conversion.id}/show)`,
				].join(" "),
				timestamp: new Date().toJSON(),
			}],
		});

		this.client.log(`<:Discoin:357656754642747403> \`${this.interaction.user.username}\` converted <:DTS:668551813317787659>${formatBalance(amount)} into ${emoji}${formatBalance(conversion.payout)} using Discoin.`);
	}
}
