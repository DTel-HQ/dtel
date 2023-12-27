import Command from "@src/internals/commandProcessor";
import { parseNumber } from "@src/internals/utils";

export default class Block extends Command {
	async run(): Promise<void> {
		const rawInput = this.interaction.options.getString("number", true);
		const toBlock = parseNumber(rawInput);

		if (toBlock === this.number!.number) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("cantBlockSelf"))],
				ephemeral: true,
			});
			return;
		}

		if (isNaN(Number(toBlock))) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("invalidBlockingNumber"))],
				ephemeral: true,
			});
			return;
		}

		const toBlockDoc = await this.db.numbers.findUnique({
			where: {
				number: toBlock,
			},
		});

		if (!toBlockDoc) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("numberDoesntExist"))],
				ephemeral: true,
			});
			return;
		}

		const blockedNumberIndex = this.number!.blocked.findIndex(n => n === toBlock);

		// If this number isn't blocked
		if (blockedNumberIndex === -1) {
			this.number!.blocked.push(toBlockDoc.number);
		// Otherwise
		} else {
			this.number!.blocked.splice(blockedNumberIndex, 1);
		}

		await this.db.numbers.update({
			where: {
				number: this.number!.number,
			},
			data: {
				blocked: this.number!.blocked,
			},
		});

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				...this.t(blockedNumberIndex === -1 ? "blockedSuccess" : "unblockedSuccess", {
					numberOrDisplay: toBlockDoc.vip?.expiry && toBlockDoc.vip?.expiry > new Date() ? toBlockDoc.vip.name : rawInput.toUpperCase(),
				}),
			}],
		});
	}
}
