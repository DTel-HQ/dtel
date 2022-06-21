import dayjs from "dayjs";
import { MessageEmbedOptions } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";

export default class Daily extends Command {
	async run(): Promise<void> {
		if (this.account?.dailyClaimedAt) {
			const oneDayAfter = dayjs(this.account.dailyClaimedAt).add(1, "day");

			// If it's too early
			if (oneDayAfter.isAfter(Date.now())) {
				return this.interaction.reply({
					embeds: [{
						color: this.config.colors.info,
						...this.t("alreadyClaimedEmbed", {
							timeRemaining: oneDayAfter.fromNow(false),
						}) as MessageEmbedOptions,
					}],
					ephemeral: true,
				});
			}
		}

		const allDailyAmounts = this.config.dailies;
		let creditCount: number;

		const perms = await this.client.getPerms(this.interaction.user.id);
		switch (perms) {
			case PermissionLevel.maintainer: {
				creditCount = allDailyAmounts.boss;
				break;
			}
			case PermissionLevel.manager: {
				creditCount = allDailyAmounts.manager;
				break;
			}
			case PermissionLevel.customerSupport: {
				creditCount = allDailyAmounts.customerSupport;
				break;
			}
			case PermissionLevel.contributor: {
				creditCount = allDailyAmounts.contributor;
				break;
			}
			case PermissionLevel.donator: {
				creditCount = allDailyAmounts.donator;
				break;
			}
			default: {
				creditCount = allDailyAmounts.default;
				break;
			}
		}

		this.account!.balance += creditCount;

		await this.db.accounts.update({
			where: {
				id: this.interaction.user.id,
			},
			data: {
				balance: this.account!.balance,
				dailyClaimedAt: new Date(),
			},
		});

		return this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				...this.t("claimedSuccessfully", {
					balance: this.account!.balance,
					noNewCredits: creditCount,
				}) as MessageEmbedOptions,
			}],
			ephemeral: true,
		});
	}
}
