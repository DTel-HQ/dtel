import { StrikeOffenderType } from "@prisma/client";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";
import { randomString } from "../../internals/utils";

export default class StrikeAdd extends Command {
	async run(): Promise<void> {
		const offender = this.interaction.options.getString("offender", true);

		if (offender === this.interaction.user.id) {
			this.interaction.reply(`>fire ${this.interaction.user.id}`);
			return;
		} else if (offender === this.config.supportGuild.id) {
			this.interaction.reply({
				embeds:	[{
					color: this.config.colors.error,
					title: "Turning against us?",
					description: "As if we'd would allow you to do this...",
				}],
			});
			return;
		}

		const possibilities = await this.client.resolveGuildChannelNumberUser(offender);

		if (possibilities.user) {
			if (possibilities.user.bot) {
				this.interaction.reply({
					embeds: [this.client.errorEmbed("Do not try to strike my brothers!", { title: "❌ User is a bot" })],
				});
				return;
			}

			if (await this.client.getPerms(possibilities.user.id) as number >= PermissionLevel.customerSupport) {
				this.interaction.reply({
					embeds: [this.client.errorEmbed("You can't get rid of someone that easily...", { title: "❌ Unfair competition" })],
				});
				return;
			}
		}

		let type: StrikeOffenderType | undefined;
		let nameToStrike = "";
		let idToStrike = "";

		if (possibilities.user) {
			type = "USER";
			nameToStrike = possibilities.user.username;
			idToStrike = possibilities.user.id;
		} else if (possibilities.guild) {
			type = "GUILD";
			nameToStrike = possibilities.guild.name;
			idToStrike = possibilities.guild.id;
		}

		if (!idToStrike || !type) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("ID could not be resolved to a number, server, user or channel.")],
			});
			return;
		}

		const reason = this.interaction.options.getString("reason", true);
		await this.db.strikes.create({
			data: {
				id: randomString(5),
				offender: idToStrike!,
				type: type!,
				reason,
				created: {
					by: this.interaction.user.id,
				},
			},
		});

		const offenderStrikeCount = await this.db.strikes.count({
			where: {
				offender: idToStrike,
			},
		}) || 0;

		// Automatic blacklist
		if (offenderStrikeCount >= 3) {
			this.db.blacklist.create({
				data: {
					id: idToStrike,
				},
			}).catch(() => null);
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				title: "✅ User stricken",
				description: `**${nameToStrike}** has been stricken and now has ${offenderStrikeCount} strikes.`,
			}],
		});

		// Attempt to DM the owner
		try {
			// Guild definitely exists if user doesn't at this point
			const userToDM = possibilities.user || await this.client.getUser(possibilities.guild!.ownerId);
			// We can't tell what language they speak here.
			await userToDM.send({
				embeds: [{
					color: this.config.colors.yellowbook,
					title: "⚠️ Warning",
					description: `You have received a strike against your ${type === "USER" ? "account" : `server **${possibilities.guild?.name}**`}. You now have **${offenderStrikeCount}** strike${offenderStrikeCount === 1 ? `` : `s`}`,
					footer: {
						text: offenderStrikeCount >= 3 ? `${type === "USER" ? "You" : `Your server`} have been blacklisted and may no longer use DTel` : "You may be blacklisted from using the bot if you reach 3 strikes.",
					},
				}],
			});
		} catch {
			// do nothing
		}
	}
}
