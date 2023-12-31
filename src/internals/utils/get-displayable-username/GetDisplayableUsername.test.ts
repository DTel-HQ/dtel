import * as target from "./GetDisplayableUsername";
import { User } from "discord.js";

let user: User;

beforeEach(() => {
	user = {} as User;
});

it("should return the user's Discord username if they have a discriminator of 0", () => {
	user.discriminator = "0";
	user.username = "username_123";

	const result = target.getDisplayableUsername(user);

	expect(result).toStrictEqual("username_123");
});

it("should return the user's Discord tag if they have an actual discriminator", () => {
	user.discriminator = "0001";
	user.username = "username_123";
	const result = target.getDisplayableUsername(user);

	expect(result).toStrictEqual("username_123#0001");
});
