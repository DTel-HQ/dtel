import { Collection, Guild, GuildMember, PermissionsBitField, Role, User } from "discord.js";

interface TestGuildMemberParams {
	user?: Partial<User>;
	permissions?: PermissionsBitField;
	guild?: Partial<Guild>;
	roles?: Collection<string, Role>;
}

export const buildTestGuildMember = (details?: TestGuildMemberParams): GuildMember => <GuildMember>{
	id: details?.user?.id ?? "user_id",
	user: details?.user ?? <User>{
		id: "user_id",
	},
	permissions: details?.permissions ?? new PermissionsBitField(),
	roles: {
		cache: details?.roles ?? new Collection<string, Role>(),
	},
	guild: details?.guild ?? undefined,

} as unknown as GuildMember;
