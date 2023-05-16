import { EmbedBuilder, User } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class AddCredit extends Command {
	async run(): Promise<void> {
		const userID = this.interaction.options.getString("user", true);

		let user: User;
		try {
			user = await this.client.getUser(userID);
		} catch {
			this.targetUserNotFound();
			return;
		}

		if (userID === this.client.user.id) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("I am *the* VIP, don't forget that!")],
			});
			return;
		} else if (user.bot) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Not sure, but I think it'll break stuff", { title: "Probably shouldn't do that." })],
			});
			return;
		}

		let account = await this.fetchAccount(userID);
		const monthsToAdd = this.interaction.options.getInteger("months", true);

		if (monthsToAdd < 0 && (account.vipMonthsRemaining + monthsToAdd) < 0) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("That would make this user a negative VIP!", { title: "Are you insane?", footer: { text: "User does not have enough months to remove this many" } })],
			});
			return;
		}

		account = await this.db.accounts.update({
			where: {
				id: account.id,
			},
			data: {
				vipMonthsRemaining: account.vipMonthsRemaining + monthsToAdd,
			},
		});

		const monthsAdded = monthsToAdd > 0;
		const addedOrRemoved = monthsAdded ? "Added" : "Removed";

		const embed = EmbedBuilder.from({
			color: this.config.colors.vip,
			title: `${addedOrRemoved} VIP months!`,
			description: `${addedOrRemoved} ${monthsToAdd} month${monthsToAdd == 1 ? "" : "s"} ${monthsAdded ? "to" : "from"} <@${userID}> (${userID})`,
			footer: {
				icon_url: this.interaction.user.displayAvatarURL(),
				text: `${this.interaction.user.tag} (${this.interaction.user.id})`,
			},
		}).setTimestamp(new Date());

		if (this.interaction.channelId != this.config.supportGuild.channels.management) {
			this.client.sendCrossShard({
				embeds: [embed],
			}, this.config.supportGuild.channels.management);
		}

		this.interaction.reply({
			embeds: [embed],
		});

		user.send({
			embeds: [{
				color: this.config.colors.vip,
				title: monthsAdded ? "💸 You're a real VIP!" : "VIP Update",
				description: `A support member has ${addedOrRemoved.toLowerCase()} ${Math.abs(monthsToAdd).toLocaleString()} VIP month${monthsToAdd == 1 ? "" : "s"} ${monthsAdded ? "to" : "from"} your account.\nYou now have ${account.vipMonthsRemaining} month${monthsToAdd == 1 ? "" : "s"} remaining.\nCall \`*411\` to spend your VIP months.`,
				footer: {
					text: "Thank you for supporting DTel!",
				},
			}],
		}).catch(() => null);
	}
}
