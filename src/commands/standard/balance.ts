import { APIEmbed, User } from "discord.js";
import Command from "../../internals/commandProcessor";
import { formatBalance, getAccount } from "../../internals/utils";

export default class Balance extends Command {
	async run(): Promise<void> {
		const taggedUser = this.interaction.options.getUser("user", false);
		const id = this.interaction.options.getString("id", false);

		let accountIDToGet = this.interaction.user.id;
		if (taggedUser) {
			accountIDToGet = taggedUser.id;
		} else if (id) {
			accountIDToGet = id;
		}

		// Ensure we know of the user -- don't share details about users who have left
		let user: User;
		try {
			user = await this.client.getUser(accountIDToGet);
		} catch {
			this.noAccount();
			return;
		}

		const account = await getAccount(accountIDToGet);
		if (!account) {
			this.noAccount();
			return;
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.info,
				author: {
					name: `${user.username}#${user.discriminator}`,
					icon_url: user.displayAvatarURL(),
				},
				...(this.t("embed", {
					balance: formatBalance(account.balance),
					vipMonthsRemaining: account.vipMonthsRemaining,
					user: user.username,

					interpolation: {
						escapeValue: false,
					},
				}) as APIEmbed),
			}],
			ephemeral: true,
		});
	}
}
