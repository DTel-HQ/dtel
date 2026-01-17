import { Mailbox } from "@prisma/client";

export const buildTestMailbox = (details?: Partial<Mailbox>): Mailbox => ({
	number: "03010000001",
	autoreply: "auto_reply",
	messages: [],
	receiving: true,
	...details,
});
