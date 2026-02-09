import { GuildConfigs, Numbers } from "@src/database/generated";

export type NumbersWithGuilds = Numbers & {
	guild?: GuildConfigs | null,
};
