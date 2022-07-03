import { AnyChannel, Client, ClientOptions, Collection, DMChannel, Guild, MessageEmbedOptions, MessageOptions, Role, ShardClientUtil, Snowflake, TextChannel, User } from "discord.js";
import { REST } from "@discordjs/rest";
import config from "../config/config";
import CallClient from "./callClient";
import { APITextChannel, RESTPatchAPIChannelMessageResult, RESTPostAPIChannelMessageResult } from "discord-api-types/v10";
import { PermissionLevel } from "../interfaces/commandData";
import { winston } from "../dtel";
import { Logger } from "winston";
import { db } from "../database/db";
import { Numbers } from "@prisma/client";
import { fetchNumber, parseNumber } from "./utils";

interface PossibleTypes {
	user?: User,
	guild?: Guild,
	number?: Numbers | null,
}

class DTelClient extends Client<true> {
	config = config;
	restAPI: REST;

	db = db;
	winston: Logger = winston;

	calls: CallClient[] = [];

	shardWithSupportGuild = 0;

	permsCache: Collection<string, PermissionLevel> = new Collection();

	constructor(options: ClientOptions) {
		super(options);

		this.restAPI = new REST();
		this.restAPI.setToken(process.env.TOKEN || this.token || "");
		this.shardWithSupportGuild = ShardClientUtil.shardIdForGuildId(config.supportGuild.id, config.shardCount);
	}

	errorEmbed(description: string, options?: MessageEmbedOptions): MessageEmbedOptions {
		return {
			color: config.colors.error,
			title: "❌ Error!",
			description,
			...options,
		};
	}

	warningEmbed(description: string, options?: MessageEmbedOptions): MessageEmbedOptions {
		return {
			color: 0xFFFF00,
			description,
			...options,
		};
	}

	async sendCrossShard(options: MessageOptions, channelID: Snowflake | string): Promise<RESTPostAPIChannelMessageResult> {
		return this.restAPI.post(`/channels/${channelID}/messages`, {
			body: options,
		}) as Promise<RESTPostAPIChannelMessageResult>;
	}

	async editCrossShard(options: MessageOptions, channelID: string, messageID: string): Promise<RESTPatchAPIChannelMessageResult> {
		return this.restAPI.patch(`/channels/${channelID}/messages/${messageID}`, {
			body: options,
		}) as Promise<RESTPatchAPIChannelMessageResult>;
	}

	async shardIdForChannelId(id: string): Promise<number> {
		if (!process.env.SHARD_COUNT || Number(process.env.SHARD_COUNT) == 1) return 0;
		const channelObject = await this.restAPI.get(`/channels/${id}`) as APITextChannel;

		return ShardClientUtil.shardIdForGuildId(channelObject.guild_id as string, Number(process.env.SHARD_COUNT));
	}

	// Use these so that we can edit them if we get performance issues
	async getUser(id: string): Promise<User> {
		return this.users.fetch(id);
	}
	async getGuild(id: string): Promise<Guild> {
		// Not safe to cache this as we won't get its updates
		return this.guilds.fetch({
			guild: id,
			cache: false,
		});
	}
	async getChannel(id: string): Promise<AnyChannel | null> {
		// Not safe to cache this as we won't get its updates
		return this.channels.fetch(id, {
			cache: false,
		});
	}

	async getPerms(userID: string): Promise<Omit<PermissionLevel, "serverAdmin">> {
		// We don't deal with serverAdmin here
		if (config.maintainers.includes(userID)) return PermissionLevel.maintainer;

		// Get perms from cache
		let perms = this.permsCache.get(userID);

		if (!perms) {
			type ctx = { memberID: string, guildID: string };
			const roles = await this.shard?.broadcastEval(async(client: Client, context: ctx): Promise<Role[]> => {
				const guild = await client.guilds.fetch(context.guildID);
				const member = await guild.members.fetch(context.memberID);
				return Array.from(member.roles.cache.values());
			}, {
				shard: this.shardWithSupportGuild,
				context: {
					memberID: userID,
					guildID: config.supportGuild.id,
				},
			}) as Role[];

			// This would work, but it will hammer the Discord API for quite a while
			// let memberInSupportServer: APIGuildMember;
			// try {
			// 	memberInSupportServer = await this.restAPI.get(`/guilds/${config.supportGuild.id}/members/${userID}`) as APIGuildMember;
			// } catch {
			// 	return PermissionLevel.none;
			// }


			if (roles.find(r => r.id === config.supportGuild.roles.boss)) perms = PermissionLevel.maintainer;
			else if (roles.find(r => r.id === config.supportGuild.roles.manager)) perms = PermissionLevel.manager;
			else if (roles.find(r => r.id === config.supportGuild.roles.customerSupport)) perms = PermissionLevel.customerSupport;
			else if (roles.find(r => r.id === config.supportGuild.roles.contributor)) perms = PermissionLevel.contributor;
			else if (roles.find(r => r.id === config.supportGuild.roles.donator)) perms = PermissionLevel.donator;
			else perms = PermissionLevel.none;

			// Rolling cache, I have a strange feeling this will cause issues in the future
			if (this.permsCache.size > 200) {
				for (const i of this.permsCache.lastKey(200 - this.permsCache.size)!) {
					this.permsCache.delete(i);
				}
			}
			// Cache user if they're not cached on this shard already
			this.permsCache.set(userID, perms);
		}

		return perms;
	}

	async resolveGuildChannelNumberUser(toResolve: string): Promise<PossibleTypes> {
		toResolve = parseNumber(toResolve);
		const possibilities: PossibleTypes = {};

		// THIS IS HELL
		// But I'm in a rush and it's kinda clean
		if (toResolve.length == 11) {
			possibilities.number = await fetchNumber(toResolve);

			if (possibilities.number) {
				if (possibilities.number?.guildID) {
					possibilities.guild = await this.getGuild(possibilities.number.guildID);
				} else {
					const tempChan = await this.getChannel(possibilities.number.channelID).catch(() => undefined);
					if (tempChan) {
						possibilities.user = (tempChan as DMChannel).recipient;
					}
				}
			}
		} else {
			possibilities.user = await this.getUser(toResolve).catch(() => undefined);
			// If toResolve is a User
			if (!possibilities.user) {
				// Else try again
				possibilities.guild = await this.getGuild(toResolve).catch(() => undefined);
			}

			// If the ID is a guild
			if (!possibilities.guild) {
				// Else if we still don't know what the toResolve is, try chanel
				const channel = await this.getChannel(toResolve).catch(() => undefined);
				if (channel) {
					if (channel.type === "DM") {
						possibilities.user = (channel as DMChannel).recipient;
					} else {
						possibilities.guild = (channel as TextChannel).guild;
					}
				}
			}
		}
		return possibilities;
	}

	// makeAvatarURL(user: APIUser): string {
	// 	const base = this.options?.http?.cdn;

	// 	let url = `${base}/avatars`;
	// 	// avatar starts with a_ if animated
	// 	// return user.avatar ? `${this.options?.http?.cdn}/avatars/${user.id}/${user.avatar}.png` : `${this.options?.http?.cdn}/avatars/${user.discriminator}.png`;
	// 	if (user.avatar) {
	// 		url += `/${user.id}/${user.avatar}`;
	// 	} else {
	// 		url += `/${user.discriminator}`;
	// 	}

	// 	if (user.avatar?.startsWith("a_")) url += "gif";
	// 	else url += "png";

	// 	return url;
	// }
}

export default DTelClient;
