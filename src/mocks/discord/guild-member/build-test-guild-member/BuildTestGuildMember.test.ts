import { Guild, PermissionsBitField } from "discord.js";
import * as target from "./BuildTestGuildMember";

it("should return a partial mock guild member", () => {
	const testGuildMember = target.buildTestGuildMember();

	expect(testGuildMember.id).toStrictEqual("user_id");
	expect(testGuildMember.permissions).toBeInstanceOf(PermissionsBitField);
	expect(testGuildMember.user).toBeDefined();
});

it("should accept a mock guild", () => {
	const mockGuild = {} as Guild;

	const testGuildMember = target.buildTestGuildMember({
		guild: mockGuild,
	});

	expect(testGuildMember.guild).toBe(mockGuild);
});

it("should accept a mock permissions bitfield", () => {
	const mockPermissions = new PermissionsBitField("Administrator");

	const testGuildMember = target.buildTestGuildMember({
		permissions: mockPermissions,
	});

	expect(testGuildMember.permissions).toBe(mockPermissions);
});

