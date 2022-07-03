import { GuildConfigs, Numbers } from "@prisma/client";

export type NumbersWithGuilds = Numbers & {
	guild?: GuildConfigs | null,
};
