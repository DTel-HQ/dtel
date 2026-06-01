import { DMChannel, GuildTextBasedChannel, APIEmbed, User, Channel, PartialDMChannel, PartialGroupDMChannel } from "discord.js";
import { NumbersWithGuilds } from "@src/interfaces/numbersWithGuilds";
import Command from "@src/internals/commandProcessor";
import { parseNumber } from "@src/internals/utils";

export default class NInfo extends Command {
	async run(): Promise<void> {
		const toFind = parseNumber(this.interaction.options.getString("number_or_channel", true));

		let number: NumbersWithGuilds | null;
		if (toFind.length > 11) {
			number = await this.db.numbers.findUnique({
				where: {
					channelID: toFind,
				},
				include: {
					guild: true,
				},
			});
		} else {
			number = await this.db.numbers.findUnique({
				where: {
					number: toFind,
				},
				include: {
					guild: true,
				},
			});
		}

		if (!number) {
			await this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("Couldn't find that number.")],
			});
			return;
		}

		const isVIP = number.vip?.expiry && number.vip?.expiry > new Date();

		const embed: APIEmbed = {
			color: isVIP ? this.config.colors.vip : this.config.colors.info,
			title: `Information about ${number.number}`,
			description: "Hit the button below for more information",
			fields: [],
		};

		// Get the channel details
		const channel = await this.client.getChannel(number.channelID).catch(() => null);
		if (!channel) {
			await this.interaction.reply({
				ephemeral: true,
				embeds: [this.client.errorEmbed("The channel associated with that number couldn't be found.")],
			});

			await this.db.numbers.delete({
				where: {
					number: number.channelID,
				},
				include: {
					phonebook: true,
					mailbox: true,
				},
			}).catch(() => null);
			return;
		}

		const ownerInfo = await this.getOwnerInfo(channel, number);

		let ownerDesc = `${ownerInfo?.numberOwner.username}\n\`${ownerInfo?.numberOwner.id}\``;
		ownerDesc += `\nStrikes: ${ownerInfo?.ownerStrikeCount ?? "Information not available"}`;

		embed.fields = [{
			name: "Channel",
			value: ownerInfo?.channelDescription ?? "Information not available",
			inline: true,
		}, {
			name: "Owner",
			value: ownerDesc,
			inline: true,
		}, {
			name: "Guild",
			value: ownerInfo?.guildDescription ?? "Information not available",
			inline: true,
		}, {
			name: "VIP",
			value: isVIP ? `True` : `False`,
			inline: true,
		}, {
			name: "Blocked",
			value: `${number.blocked.length || `None`}`,
			inline: true,
		},
		{
			name: "Owner Strikes",
			value: ownerInfo?.ownerStrikeCount.toString() ?? "Information not available",
			inline: true,
		},
		{
			name: "Created and expires:",
			value: `• ${number.createdAt || "Not available"}\n• ${new Date(number.expiry)}`,
			inline: false,
		}];

		await this.interaction.reply({ embeds: [embed] });

		// TODO: 2nd page extra info
	}


	async getOwnerInfo(channel: Channel, number: NumbersWithGuilds): Promise<OwnerInfo | undefined> {
		if (!channel.isDMBased()) {
			const guild = await this.client.getGuild(channel.guildId).catch(() => null);

			if (!guild) return undefined;

			const ownerStrikeCount = await this.db.strikes.count({
				where: {
					offender: guild.ownerId,
				},
			}) || 0;

			const numberOwner = await this.client.getUser(guild.ownerId);

			return {
				numberOwner,
				ownerStrikeCount,
				guildDescription: `${guild.name}\n\`${guild.id}\`\nWhitelisted: ${number.guild?.whitelisted ? "Yes" : "No"}`,
				channelDescription: `#${channel.name}\n\`${channel.id}\``,
				footer: {
					icon_url: guild.icon ? guild.iconURL()! : this.client.user.displayAvatarURL(),
					text: guild.name,
				},
			};
		} else {
			const numberOwner = await this.determineDmOwner(channel).catch(() => null);
			if (numberOwner === "group") {
				return undefined;
			}


			if (!numberOwner) return undefined;

			const ownerStrikeCount = await this.db.strikes.count({
				where: {
					offender: numberOwner.id,
				},
			}) || 0;

			return {
				numberOwner,
				ownerStrikeCount,
				guildDescription: "DM Number",
				channelDescription: `#*DM Channel*\n\`${channel.id}\``,
				footer: {
					icon_url: numberOwner.displayAvatarURL(),
					text: `${numberOwner.username}#${numberOwner.discriminator}`,
				},
			};
		}
	}


	async determineDmOwner(channel: DMChannel | PartialDMChannel | PartialGroupDMChannel): Promise<User | "group"> {
		const isGroupChannel = !("recipientId" in channel);
		if (isGroupChannel) {
			return "group";
		}
		return this.client.getUser(channel.recipientId);
	}
}


interface OwnerInfo {
	numberOwner: User;
	ownerStrikeCount: number;
	guildDescription: string;
	channelDescription: string;
	footer: {
		icon_url: string;
		text: string;
	}
}
