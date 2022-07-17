import { MessageEmbedOptions, User } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";

export default class AddCredit extends Command {
	async run(): Promise<void> {
		if (this.interaction.guildId != this.config.supportGuild.id) {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("This command cannot be ran outside of the support server.")],
			});
		}

		const userID = this.interaction.options.getString("user", true);

		let user: User;
		try {
			user = await this.client.getUser(userID);
		} catch {
			return this.targetUserNotFound();
		}

		const perms = await this.client.getPerms(userID);

		if (userID === this.client.user.id) {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("I already have all the money!")],
			});
		} else if (user.bot) {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Are you sure you want to give them more money?", { title: "AI will destroy humans!!!" })],
			});
		} else if (perms >= PermissionLevel.customerSupport && perms != PermissionLevel.maintainer) {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("That's not something you should be trying on the job!", { title: "Seriously?" })],
			});
		}

		let account = await this.fetchAccount(userID);
		const amountOfCredits = this.interaction.options.getInteger("credits", true);

		if (amountOfCredits < 0 && (account.balance + amountOfCredits) < 0) {
			return this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("That would bankrupt this user!", { title: "Are you insane?" })],
			});
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

		const embed: MessageEmbedOptions = {
			color: this.config.colors.receipt,
			title: `${addedOrRemoved} credits!`,
			description: `${addedOrRemoved} ${this.config.dtsEmoji} ${Math.abs(amountOfCredits)} ${creditsAdded ? "to" : "from"} <@${userID}> (${userID})`,
			footer: {
				iconURL: this.interaction.user.displayAvatarURL(),
				text: `${this.interaction.user.tag} (${this.interaction.user.id})`,
			},
			timestamp: new Date(),
		};

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
				title: creditsAdded ? "Cash!" : "Your balance changed",
				description: `A support member has ${addedOrRemoved.toLowerCase()} ${this.config.dtsEmoji}${Math.abs(amountOfCredits)} ${creditsAdded ? "to" : "from"} your account. You now have ${this.config.dtsEmoji}${account.balance}.`,
			}],
		}).catch(() => null);
	}
}
