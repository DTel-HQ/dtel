import { Accounts } from "@prisma/client";
import { APIUser } from "discord-api-types/v10";
import { MessageEmbedOptions } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class Balance extends Command {
	async run(): Promise<void> {
		const taggedUser = this.interaction.options.getUser("user", false);
		const id = this.interaction.options.getString("id", false);

		let accountIDToGet: string = this.interaction.user.id;
		if (taggedUser) {
			accountIDToGet = taggedUser.id;
		} else if (id) {
			accountIDToGet = id;
		}

		let user: APIUser;
		try {
			user = await this.client.getUser(accountIDToGet);
		} catch {
			return this.noAccount();
		}

		const account = await this.getAccount(accountIDToGet);
		if (!account) return this.noAccount();

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.info,
				author: {
					name: `${user.username}#${user.discriminator}`,
					iconURL: this.client.makeAvatarURL(user),
				},
				...(this.t("embed", {
					account,
					creditsEmoji: this.config.dtsEmoji,
					paymentLink: this.config.paymentLink,
					user: user.username,

					interpolation: {
						escapeValue: false,
					},
				}) as MessageEmbedOptions),
			}],
			ephemeral: true,
		});
	}

	async getAccount(id: string): Promise<Accounts | null> {
		let account: Accounts | null;
		if (id === this.interaction.user.id) {
			account = this.account!;
		} else {
			account = await this.db.accounts.findUnique({
				where: {
					id,
				},
			});
		}

		return account;
	}

	async noAccount(): Promise<void> {
		return this.interaction.reply({
			embeds: [this.client.errorEmbed(this.t("errors.noAccount"))],
			ephemeral: true,
		});
	}
}
