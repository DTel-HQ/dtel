import { Numbers } from "@src/database/generated";
import { db } from "@src/database/db";

export const getNumberFromDbByNumber = (number: string): Promise<Numbers | null> => db.numbers.findUnique({
	where: {
		number: number,
	},
});
