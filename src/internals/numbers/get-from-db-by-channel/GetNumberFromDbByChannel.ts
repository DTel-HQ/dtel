import { Numbers } from "@src/database/generated";
import { db } from "@src/database/db";

export const getNumberFromDbByChannel = (channelId: string): Promise<Numbers | null> => db.numbers.findUnique({
	where: {
		channelID: channelId,
	},
});
