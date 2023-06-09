import { DMChannel, GuildTextBasedChannel, APIEmbed, TextBasedChannel, User } from "discord.js";
import { NumbersWithGuilds } from "../../interfaces/numbersWithGuilds";
import Command from "../../internals/commandProcessor";
import { parseNumber } from "../../internals/utils";

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
			this.interaction.reply({
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
		const channel = await this.client.getChannel(number.channelID).catch(() => null) as TextBasedChannel;
		if (!channel) {
			this.interaction.reply({
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

		let numberOwner: User;
		let ownerStrikeCount: number;
		let guildDescription = "";
		let channelDescription = "";

		// If this is a guild channel
		// We know we can see the channel at this point, so we can definitely see both the guild and the owner
		// If there is no guild, since we can see the channel we can see the user;
		if (!channel.isDMBased()) {
			const guild = await channel.guild.fetch();
			ownerStrikeCount = await this.db.strikes.count({
				where: {
					offender: guild.ownerId,
				},
			}) || 0;

			numberOwner = await this.client.getUser(guild.ownerId);

			guildDescription = `${guild.name}\n\`${guild.id}\`\nWhitelisted: ${number.guild?.whitelisted ? "Yes" : "No"}`;
			channelDescription = `#${(channel as GuildTextBasedChannel).name}\n\`${channel.id}\``;

			let footerImage = this.client.user.displayAvatarURL();
			if (guild.icon) {
				footerImage = guild.iconURL()!;
			}

			embed.footer = {
				icon_url: footerImage,
				text: guild.name,
			};
		} else {
			const dmChannel = channel as DMChannel;

			numberOwner = await this.client.getUser(dmChannel.recipientId); // This should always be visible to us as we're in the server
			ownerStrikeCount = await this.db.strikes.count({
				where: {
					offender: numberOwner.id,
				},
			}) || 0;

			guildDescription = "DM Number";
			channelDescription = `#*DM Channel*\n\`${channel.id}\``;

			embed.footer = {
				icon_url: numberOwner.displayAvatarURL(),
				text: `${numberOwner.username}#${numberOwner.discriminator}`,
			};
		}

		let ownerDesc = `${numberOwner.username}#${numberOwner.discriminator}\n\`${numberOwner.id}\``;
		ownerDesc += `\nStrikes: ${ownerStrikeCount}`;

		embed.fields = [{
			name: "Channel",
			value: channelDescription,
			inline: true,
		}, {
			name: "Owner",
			value: ownerDesc,
			inline: true,
		}, {
			name: "Guild",
			value: guildDescription,
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
			value: ownerStrikeCount.toString(),
			inline: true,
		},
		{
			name: "Created and expires:",
			value: `• ${number.createdAt || "Not available"}\n• ${new Date(number.expiry)}`,
			inline: false,
		}];

		this.interaction.reply({ embeds: [embed] });

		// TODO: 2nd page extra info
	}
}
