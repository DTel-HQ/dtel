import { Numbers } from "@prisma/client";
import { db } from "@src/database/db";

export const getNumberFromDbByChannel = (channelId: string): Promise<Numbers | null> => db.numbers.findUnique({
	where: {
		channelID: channelId,
	},
});
