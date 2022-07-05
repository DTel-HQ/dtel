import { MessageEmbedOptions } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";
import { parseNumber } from "../../internals/utils";

export default class Blacklist extends Command {
	async run(): Promise<void> {
		const toBlacklist = parseNumber(this.interaction.options.getString("id", true));

		const possibilities = await this.client.resolveGuildChannelNumberUser(toBlacklist);

		if (possibilities.user) {
			if (possibilities.user.bot) {
				return this.interaction.reply({
					embeds: [this.client.errorEmbed("Do not try to blacklist my brothers!", { title: "❌ User is a bot" })],
				});
			}

			if (await this.client.getPerms(possibilities.user.id) >= PermissionLevel.customerSupport) {
				return this.interaction.reply({
					embeds: [this.client.errorEmbed("You can't get rid of someone that easily...", { title: "❌ Unfair competition" })],
					ephemeral: true,
				});
			}
		}

		let idToBlacklist: string | undefined;
		if (possibilities.user) {
			idToBlacklist = possibilities.user.id;
		} else if (possibilities.guild) {
			idToBlacklist = possibilities.guild.id;
		}

		if (!idToBlacklist) {
			return this.interaction.reply({
				embeds: [this.client.errorEmbed("ID could not be resolved to a number, server, user or channel.")],
				ephemeral: true,
			});
		}

		if (idToBlacklist === this.interaction.user.id) {
			return this.interaction.reply({ content: `You dumb :b:oi, don't blacklist yourself!`, ephemeral: true });
		}

		if (idToBlacklist === this.config.supportGuild.id) {
			return this.interaction.reply({
				embeds:	[{
					color: this.config.colors.error,
					title: "Turning against us?",
					description: "As if we'd would allow you to do this...",
				}],
				ephemeral: true,
			});
		}

		const isBlacklisted = await this.db.blacklist.findUnique({
			where: {
				id: idToBlacklist,
			},
		});

		const embed: MessageEmbedOptions = {
			color: this.config.colors.yellowbook,
			author: {
				iconURL: possibilities.user ? possibilities.user.displayAvatarURL() : (possibilities.guild?.icon ? possibilities.guild.iconURL()! : this.client.user.defaultAvatarURL),
				name: possibilities.user ? possibilities.user.username : possibilities.guild!.name,
			},
			footer: {
				iconURL: this.interaction.user.displayAvatarURL(),
				text: `By ${this.interaction.user.username} (${this.interaction.user.id})`,
			},
			timestamp: new Date(),
		};

		const toDM = possibilities.user || await possibilities.guild?.fetchOwner();

		if (!isBlacklisted) {
			await this.db.blacklist.create({
				data: {
					id: idToBlacklist,
				},
			});

			embed.title = `Added ${possibilities.user ? "user" : "guild"} to the blacklist.`;
			if (possibilities.guild) {
				possibilities.guild.leave();
			}
			await this.db.numbers.deleteMany({
				where: {
					guildID: possibilities.guild ? possibilities.guild.id : undefined,
					userID: possibilities.user ? possibilities.user.id : undefined,
				},
			});
			toDM?.send({
				embeds: [{
					color: this.config.colors.error,
					title: "You've been blacklisted",
					description: "This means you can no longer use DTel.\n\nIf you feel like this action was unfair, you can dispute it with one of the bosses in the support server. (Don't try calling *611, you can't use the bot.) If you evade this blacklist with an alternate account, we will ignore your appeals.",
				}],
			}).catch(() => null);
		} else {
			await this.db.blacklist.delete({
				where: {
					id: idToBlacklist,
				},
			});

			embed.title = `Removed ${possibilities.user ? "user" : "guild"} from the blacklist.`;
			toDM?.send({
				embeds: [{
					color: this.config.colors.info,
					title: "You've been pardoned",
					description: "You have been removed from the blacklist, however, your strikes have not been cleared. Any further violation will put you back on the blacklist.",
				}],
			}).catch(() => null);
		}

		this.interaction.reply({ embeds: [embed] });
	}
}
