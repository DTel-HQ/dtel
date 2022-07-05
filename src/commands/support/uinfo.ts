import { MessageEmbedOptions, User } from "discord.js";
import Command from "../../internals/commandProcessor";
export default class UInfo extends Command {
	async run(): Promise<void> {
		const toFind = this.interaction.options.getString("user", true);

		let user: User;
		try {
			user = await this.client.getUser(toFind);
		} catch {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Couldn't find that user.")],
			});
		}

		const embed: MessageEmbedOptions = {
			color: this.config.colors.info,
			author: {
				iconURL: user.displayAvatarURL(),
				name: `${user.tag} (${user.id})`,
			},
			footer: {
				text: `Use /strikes for more information. Server management permissions indicated by red phone..`,
			},
		};

		const userAccount = await this.db.accounts.findUniqueOrThrow({
			where: {
				id: toFind,
			},
			include: {
				_count: {
					select: {
						strikes: true,
					},
				},
			},
		}).catch(() => this.db.accounts.create({
			data: {
				id: toFind,
			},
			include: {
				_count: {
					select: {
						strikes: true,
					},
				},
			},
		}));

		const blacklistEntry = await this.db.blacklist.findUnique({
			where: {
				id: toFind,
			},
		});

		const userNumber = await this.db.numbers.findFirst({
			where: {
				userID: toFind,
			},
		});

		embed.fields = [{
			name: "Blacklisted",
			value: blacklistEntry ? "True" : "False",
			inline: true,
		}, {
			name: "Strikes",
			value: userAccount?._count.strikes ? userAccount?._count.strikes.toString() : "0",
			inline: true,
		}, {
			name: "DM Number",
			value: userNumber ? `\`${userNumber.number}\`` : `None`,
			inline: true,
		}, {
			name: "Balance",
			value: `${this.config.dtsEmoji} ${userAccount.balance}`,
			inline: true,
		}, {
			name: "VIP Months",
			value: userAccount.vipMonthsRemaining.toString(),
			inline: true,
		}];

		return this.interaction.reply({ embeds: [embed] });
	}
}
