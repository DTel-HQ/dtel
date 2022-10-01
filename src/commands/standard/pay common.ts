// This command's embed editing kinda spiraled out of control
// Feel free to refactor
import { Accounts } from "@prisma/client";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, User } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";
import { formatBalance, upperFirst } from "../../internals/utils";

export default abstract class PayCommonFunctions extends Command {
	async payUser(toPay: Accounts, user: User): Promise<void> {
		if (user.bot) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("wasteOfMoney"))],
			});
			return;
		}

		const totalCost = this.interaction.options.getInteger("credits", true);

		if (totalCost < this.config.minTransfer) {
			this.interaction.reply({
				embeds: [{
					color: this.config.colors.error,
					...this.t("tooLow"),
				}],
			});
			return;
		}

		const senderPerms = await this.client.getPerms(this.interaction.user.id);
		const recipientPerms = await this.client.getPerms(user.id);

		const transferRate = recipientPerms >= PermissionLevel.donator || senderPerms >= PermissionLevel.donator ? this.config.vipTransferRate : this.config.normalTransferRate;

		const totalReceived = transferRate * totalCost;
		const fee = Math.round(totalCost - totalReceived);

		if (totalCost > this.account!.balance) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("cantAfford"))],
			});
			return;
		}

		const embed = EmbedBuilder.from({
			color: this.config.colors.info,
			author: {
				name: this.interaction.user.tag,
				icon_url: this.interaction.user.displayAvatarURL(),
			},

			...this.t("confirmEmbedOptions"),
			...this.t("embed", {
				displayName: `${user.tag} (${user.id})`,
				preFeeToSend: totalCost,
				fee: formatBalance(fee),
				postFeeCost: formatBalance(totalReceived),
				newBalance: formatBalance(this.account!.balance - totalCost),
				message: this.interaction.options.getInteger("message", false) || "None",
			}),
		}).setTimestamp(new Date());

		const reply = await this.interaction.reply({
			embeds: [embed],

			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents([
					new ButtonBuilder()
						.setEmoji("✅")
						.setLabel(upperFirst(this.genericT("continue")))
						.setStyle(ButtonStyle.Primary)
						.setCustomId("dtelnoreg-pay-continue"),
					new ButtonBuilder()
						.setEmoji("✖️")
						.setLabel(upperFirst(this.genericT("cancel")))
						.setStyle(ButtonStyle.Danger)
						.setCustomId("dtelnoreg-pay-cancel"),
				]),
			],
		});

		try {
			const buttonPress = await reply.awaitMessageComponent({
				filter: interaction => interaction.user.id === this.interaction.user.id,
				time: 1 * 60 * 1000, // 1 minute
				componentType: ComponentType.Button,
			});

			if (buttonPress.customId.endsWith("cancel")) throw new Error();
		} catch {
			// TODO: Cancel transaction by disabling buttons (?)
		}

		// From here we know that they accepted (because of above)

		// Update the sender
		await this.db.accounts.update({
			where: {
				id: this.interaction.user.id,
			},
			data: {
				balance: {
					decrement: totalCost,
				},
			},
		});
		// Update the recipient and get their new balance
		const otherPersonsNewBalance = (await this.db.accounts.update({
			where: {
				id: this.interaction.user.id,
			},
			data: {
				balance: {
					increment: totalReceived,
				},
			},
			select: {
				balance: true,
			},
		})).balance;

		// Edit the embed -- to change from confirm to receipt
		embed
			.setColor(this.config.colors.receipt)
			.setFooter(null)
			.setTitle(this.t("transactionCompleteEmbedOptions.title"))
			.setDescription(this.t("transactionCompleteEmbedOptions.description"));

		embed.spliceFields(1, 1, {
			name: this.t("transactionDetails"),
			value: this.t("editedTransactionDescription", {
				preFeeCost: totalCost,
				fee,
				feePercentage: (100 - (transferRate * 100)).toString(),
			}),
		});

		// Send the receipt to the sender
		await this.interaction.editReply({
			embeds: [embed],
			components: [],
		});

		// Edit the embed again -- to DM user
		embed
			.setTitle(`💸 ${upperFirst(this.genericT("received"))}`)
			.setDescription(this.t("moneySent"))
			.setFooter(null);

		// Edit user field
		embed.spliceFields(0, 1, {
			name: this.t("newBalance"),
			value: `${this.config.dtsEmoji} ${formatBalance(otherPersonsNewBalance)}`,
		});
		embed.spliceFields(2, 1, {
			name: this.t("sender"),
			value: `${this.interaction.user.tag}`,
		});

		// Try to DM the user
		user.send({
			embeds: [embed],
		}).catch(() => null);
	}
}
