import { Numbers } from "@src/database/generated";
import { db } from "@src/database/db";

export const getNumberLocale = async(number: Numbers): Promise<string> => {
	if (!number.guildID) return "en";

	const locale = await db.guildConfigs.findUnique({
		where: {
			id: number.guildID,
		},
		select: {
			locale: true,
		},
	});

	return locale?.locale ?? "en";
};
