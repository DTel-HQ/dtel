import { Mailbox, Numbers } from "@prisma/client";
import { db } from "@src/database/db";

export const getMailboxByNumber = (number: Numbers["number"]): Promise<Mailbox | null> => db.mailbox.findUnique({
	where: {
		number,
	},
});
