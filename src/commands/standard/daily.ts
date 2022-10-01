import dayjs from "dayjs";
import { APIEmbed } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";

export default class Daily extends Command {
	async run(): Promise<void> {
		if (this.account?.dailyClaimedAt) {
			const oneDayAfter = dayjs(this.account.dailyClaimedAt).add(1, "day");

			// If it's too early
			if (oneDayAfter.isAfter(Date.now())) {
				this.interaction.reply({
					embeds: [{
						color: this.config.colors.info,
						...this.t("alreadyClaimedEmbed", {
							timeRemaining: oneDayAfter.fromNow(false),
						}) as APIEmbed,
					}],
					ephemeral: true,
				});
				return;
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

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				...this.t("claimedSuccessfully", {
					balance: this.account!.balance,
					noNewCredits: creditCount,
				}) as APIEmbed,
			}],
			ephemeral: true,
		});

		this.client.log(`📆 \`${this.interaction.user.username}\` (${this.interaction.user.id}) has claimed their \`${creditCount}\` daily credits.`);
	}
}
