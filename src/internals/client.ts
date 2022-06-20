import { Client, ClientOptions, MessageEmbedOptions, MessageOptions, ShardClientUtil, Snowflake } from "discord.js";
import { REST } from "@discordjs/rest";
import config from "../config/config";
import CallClient from "./callClient";
import { APITextChannel, APIGuildMember, RESTPatchAPIChannelMessageResult, RESTPostAPIChannelMessageResult, APIUser, RESTGetAPIUserResult } from "discord-api-types/v10";
import { PermissionLevel } from "../interfaces/commandData";
import { winston } from "../dtel";
import { Logger } from "winston";
import { db } from "../database/db";

class DTelClient extends Client<true> {
	config = config;
	restAPI: REST;

	db = db;
	winston: Logger = winston;

	calls: CallClient[] = [];

	constructor(options: ClientOptions) {
		super(options);

		this.restAPI = new REST();
		this.restAPI.setToken(process.env.TOKEN || this.token || "");
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

	// TODO: Convert to re2 somehow
	parseNumber(input: string): string {
		return input.replace(/(a|b|c)/ig, "2")
			.replace(/(d|e|f)/ig, "3")
			.replace(/(g|h|i)/ig, "4")
			.replace(/(j|k|l)/ig, "5")
			.replace(/(m|n|o)/ig, "6")
			.replace(/(p|q|r|s)/ig, "7")
			.replace(/(t|u|v)/ig, "8")
			.replace(/(w|x|y|z)/ig, "9")
			.replace(/-/ig, "")
			.replace(/("("|")")/ig, "")
			.replace(/\s+/g, "");
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

	async getUser(id: string): Promise<APIUser> {
		return this.restAPI.get(`/users/${id}`) as Promise<RESTGetAPIUserResult>;
	}

	async getPerms(userID: string): Promise<Omit<PermissionLevel, "serverAdmin">> {
		// We don't deal with serverAdmin here
		if (config.maintainers.includes(userID)) return PermissionLevel.maintainer;

		let memberInSupportServer: APIGuildMember;
		try {
			memberInSupportServer = await this.restAPI.get(`/guilds/${config.supportGuild.id}/members/${userID}`) as APIGuildMember;
		} catch {
			return PermissionLevel.none;
		}

		const roles = memberInSupportServer.roles;

		if (roles.includes(config.supportGuild.roles.boss)) return PermissionLevel.maintainer;
		else if (roles.includes(config.supportGuild.roles.customerSupport)) return PermissionLevel.customerSupport;
		else if (roles.includes(config.supportGuild.roles.contributor)) return PermissionLevel.contributor;
		else if (roles.includes(config.supportGuild.roles.donator)) return PermissionLevel.donator;

		return PermissionLevel.none;
	}

	makeAvatarURL(user: APIUser): string {
		const base = this.options?.http?.cdn;

		let url = `${base}/avatars`;
		// avatar starts with a_ if animated
		// return user.avatar ? `${this.options?.http?.cdn}/avatars/${user.id}/${user.avatar}.png` : `${this.options?.http?.cdn}/avatars/${user.discriminator}.png`;
		if (user.avatar) {
			url += `/${user.id}/${user.avatar}`;
		} else {
			url += `/${user.discriminator}`;
		}

		if (user.avatar?.startsWith("a_")) url += "gif";
		else url += "png";

		return url;
	}
}

export default DTelClient;
