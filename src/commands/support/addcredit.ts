import { EmbedBuilder, User } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
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

		const perms = await this.client.getPerms(userID);

		if (userID === this.client.user.id) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("I already have all the money!")],
			});
			return;
		} else if (user.bot) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Are you sure you want to give them more money?", { title: "AI will destroy humans!!!" })],
			});
			return;
		} else if (perms >= PermissionLevel.customerSupport && perms != PermissionLevel.maintainer) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("That's not something you should be trying on the job!", { title: "Seriously?" })],
			});
			return;
		}

		let account = await this.fetchAccount(userID);
		const amountOfCredits = this.interaction.options.getInteger("credits", true);

		if (amountOfCredits < 0 && (account.balance + amountOfCredits) < 0) {
			this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("That would bankrupt this user!", { title: "Are you insane?" })],
			});
			return;
		}

		account = await this.db.accounts.update({
			where: {
				id: account.id,
			},
			data: {
				balance: account.balance + amountOfCredits,
			},
		});

		const creditsAdded = amountOfCredits > 0;
		const addedOrRemoved = creditsAdded ? "Added" : "Removed";

		const embed = EmbedBuilder.from({
			color: this.config.colors.receipt,
			title: `${addedOrRemoved} credits!`,
			description: `${addedOrRemoved} ${this.config.dtsEmoji} ${Math.abs(amountOfCredits)} ${creditsAdded ? "to" : "from"} <@${userID}> (${userID})`,
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
				color: this.config.colors.receipt,
				title: creditsAdded ? "💸 Cash!" : "Your balance changed",
				description: `A support member has ${addedOrRemoved.toLowerCase()} ${this.config.dtsEmoji}${Math.abs(amountOfCredits).toLocaleString()} ${creditsAdded ? "to" : "from"} your account.\nYou now have ${this.config.dtsEmoji}${account.balance}.`,
			}],
		}).catch(() => null);
	}
}
