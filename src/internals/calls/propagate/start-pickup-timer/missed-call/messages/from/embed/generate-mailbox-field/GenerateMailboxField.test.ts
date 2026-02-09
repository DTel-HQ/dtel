import * as target from "./GenerateMailboxField";
import { Mailbox, Numbers } from "@src/database/generated";
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


it("should generate mailbox fields", () => {
	prismaMock.mailbox.findUnique.mockResolvedValue(mailbox);

	const result = target.generateMailboxField(number, mailbox, "en");

	expect(result).resolves.toEqual([{
		name: "📠 Answering Machine",
		value: "auto_reply",
		inline: false,
	}]);
});

it("should include mailbox full if the mailbox has too many messages", () => {
	mailbox.messages = Array(50);
	prismaMock.mailbox.findUnique.mockResolvedValue(mailbox);

	const result = target.generateMailboxField(number, mailbox, "en");

	expect(result).resolves.toEqual([{
		name: "📠 Answering Machine",
		value: "auto_reply (Mailbox full)",
		inline: false,
	}]);
});

