import { prismaMock } from "@src/mocks/prisma.test";
import * as target from "./GetMailboxByNumber";

beforeEach(() => {
	prismaMock.mailbox.findUnique.mockResolvedValue({
		number: "03010000001",
		receiving: true,
		autoreply: "automatic reply",
		messages: [],
	});
});

it("should try to get a call", async() => {
	const result = await target.getMailboxByNumber("03010000001");

	expect(result).toEqual({
		number: "03010000001",
		receiving: true,
		autoreply: "automatic reply",
		messages: [],
	});
	expect(prismaMock.mailbox.findUnique).toHaveBeenCalledTimes(1);
});
