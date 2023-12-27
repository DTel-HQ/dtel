import * as target from "./GenerateMailboxField";
import { Mailbox, Numbers } from "@prisma/client";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { buildTestMailbox } from "@src/internals/mailbox/build-test-mailbox/BuildTestMailbox";
import { initInternationalization } from "@src/internationalization/i18n";
import { prismaMock } from "@src/mocks/prisma.test";

let number: Numbers;
let mailbox: Mailbox;
beforeEach(() => {
	initInternationalization();

	number = buildTestNumber();
	mailbox = buildTestMailbox();

	prismaMock.mailbox.findUnique.mockResolvedValue(mailbox);
});

it("should return empty array if no mailbox", () => {
	prismaMock.mailbox.findUnique.mockResolvedValue(null);

	const result = target.generateMailboxField(number, "en");

	expect(result).resolves.toEqual([]);
});

it("should generate mailbox fields", () => {
	prismaMock.mailbox.findUnique.mockResolvedValue(mailbox);

	const result = target.generateMailboxField(number, "en");

	expect(result).resolves.toEqual([{
		name: "📠 Answering Machine",
		value: "auto_reply",
		inline: false,
	}]);
});

it("should include mailbox full if the mailbox has too many messages", () => {
	mailbox.messages = Array(50);
	prismaMock.mailbox.findUnique.mockResolvedValue(mailbox);

	const result = target.generateMailboxField(number, "en");

	expect(result).resolves.toEqual([{
		name: "📠 Answering Machine",
		value: "auto_reply (Mailbox full)",
		inline: false,
	}]);
});

