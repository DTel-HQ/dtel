import { User } from "discord.js";

export const getDisplayableUsername = (user: User) => {
	if (user.discriminator == "0") return `${user.username}`;
	return `${user.username}#${user.discriminator}`;
};
