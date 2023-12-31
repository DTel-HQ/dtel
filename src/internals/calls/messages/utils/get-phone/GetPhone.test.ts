import config from "@src/config/config";
import * as target from "./GetPhone";
import { PermissionLevel } from "@src/interfaces/commandData";

it("should return default phone if user has no perms", () => {
	const phone = target.getPhone(PermissionLevel.none);

	expect(phone).toEqual(config.callPhones.default);
});

it("should return donator phone if user has no perms", () => {
	const phone = target.getPhone(PermissionLevel.donator);

	expect(phone).toEqual(config.callPhones.donator);
});

it("should return server admin phone if user is a server admin", () => {
	const phone = target.getPhone(PermissionLevel.serverAdmin);

	expect(phone).toEqual(config.callPhones.admin);
});

it("should return customer support phone if the user is a maintainer", () => {
	const phone = target.getPhone(PermissionLevel.maintainer);

	expect(phone).toEqual(config.callPhones.support);
});

it("should return customer support phone if the user is a support member", () => {
	const phone = target.getPhone(PermissionLevel.customerSupport);

	expect(phone).toEqual(config.callPhones.support);
});

it("should return contributor phone if the user is a contributor", () => {
	const phone = target.getPhone(PermissionLevel.contributor);

	expect(phone).toEqual(config.callPhones.contributor);
});
