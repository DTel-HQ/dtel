import * as target from "./GetPerms";
import { Collection, Guild, GuildMember, GuildMemberManager, Role, User } from "discord.js";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { buildTestGuildMember } from "@src/mocks/discord/guild-member/build-test-guild-member/BuildTestGuildMember";
import { PermissionLevel } from "@src/interfaces/commandData";
import config from "@src/config/config";

let supportGuild: Guild;
let supportGuildMemberManager: DeepMockProxy<GuildMemberManager>;
let allGuildMembers: Collection<string, GuildMember>;
let user1Roles: Collection<string, Role>;

jest.mock<typeof config>("@src/config/config", () => ({
	...jest.requireActual("@src/config/config").default,
	maintainers: ["maintainer"],
	supportGuild: {
		id: "support_guild_id",
		roles: {
			contributor: "contributor_role_id",
			customerSupport: "customer_support_role_id",
			donator: "donator_role_id",
			manager: "manager_role_id",
		},
	},
}));

beforeEach(() => {
	target.permsCache.clear();

	allGuildMembers = new Collection<string, GuildMember>();

	supportGuild = {
		id: "support_guild_id",
	} as Guild;

	// Get around jest picking the wrong overload by casting to never
	discordClientMock.guilds.fetch.mockResolvedValue(supportGuild as never);

	supportGuildMemberManager = mockDeep<GuildMemberManager>();

	supportGuildMemberManager.fetch.mockImplementation((async(id: string): Promise<GuildMember> => allGuildMembers.get(id)!) as never);
	supportGuild.members = supportGuildMemberManager;

	user1Roles = new Collection <string, Role>();

	allGuildMembers.set("user_1", buildTestGuildMember({
		user: {
			id: "user_1",
		} as User,
		roles: user1Roles,
	}));
});

it("should return no permissions if the user isn't in the support guild", async() => {
	const perms = await target.getPerms("user_2");

	expect(perms).toStrictEqual(PermissionLevel.none);
});

it("should return maintainer perms if the user is a maintainer", async() => {
	const perms = await target.getPerms("maintainer");

	expect(perms).toStrictEqual(PermissionLevel.maintainer);
});

const testCases: [PermissionLevel, string][] = [
	[PermissionLevel.manager, "manager_role_id"],
	[PermissionLevel.contributor, "contributor_role_id"],
	[PermissionLevel.donator, "donator_role_id"],
	[PermissionLevel.customerSupport, "customer_support_role_id"],
];

describe("role based permission levels", () => {
	it.each(testCases)(`should return permission level %i for role id %s`, async(expectedPermissionLevel, roleId) => {
		user1Roles.set(roleId, {
			id: roleId,
		} as Role);

		const perms = await target.getPerms("user_1");
		expect(perms).toEqual(expectedPermissionLevel);
	});
});

