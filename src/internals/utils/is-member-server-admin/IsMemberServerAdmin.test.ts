import { GuildMember, PermissionsBitField } from "discord.js";
import * as target from "./IsMemberServerAdmin";
import { buildTestGuildMember } from "@src/mocks/discord/guild-member/build-test-guild-member/BuildTestGuildMember";

let perms: PermissionsBitField;
let member: GuildMember;

beforeEach(() => {
	perms = new PermissionsBitField();

	member = buildTestGuildMember({
		permissions: perms,
	});
});

it("should return false if no member passed", () => {
	const result = target.isMemberAServerAdmin(null);

	expect(result).toBe(false);
});

it("should return false if the member doesn't have the manage guild permission", () => {
	const result = target.isMemberAServerAdmin(member);

	expect(result).toBe(false);
});

it("should return true if the member has the manage guild permission", () => {
	perms.add("ManageGuild");

	const result = target.isMemberAServerAdmin(member);

	expect(result).toBe(true);
});
