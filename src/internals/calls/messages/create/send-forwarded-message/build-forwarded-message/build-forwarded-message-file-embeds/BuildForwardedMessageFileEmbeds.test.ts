import config from "@src/config/config";
import { initInternationalization } from "@src/internationalization/i18n";
import { Attachment, Collection, Message } from "discord.js";
import * as target from "./BuildForwardedMessageFileEmbeds";

let message: Message;

beforeEach(() => {
	initInternationalization();

	message = {
		attachments: new Collection<string, Attachment>,
	} as unknown as Message;
});

it("should return empty array if the message has no attachments", () => {
	const result = target.buildForwardedMessageFileEmbeds(message, "en");

	expect(result).toStrictEqual([]);
});

it("should return an embed for an attachment", () => {
	message.attachments.set("attachment_1", <Attachment>{
		name: "attachment_1",
		url: "https://attachment_1",
	} as unknown as Attachment);

	const result = target.buildForwardedMessageFileEmbeds(message, "en");

	expect(result).toHaveLength(1);
	expect(result[0].data).toEqual({
		color: config.colors.yellowbook,
		description: `File: **[attachment_1](https://attachment_1)**`,
		footer: {
			text: "Don't trust files from strangers",
		},
	});
});

it("should return multiple embeds if multiple attachments are provided", () => {
	message.attachments.set("attachment_1", <Attachment>{
		name: "attachment_1",
		url: "https://attachment_1",
	} as unknown as Attachment);
	message.attachments.set("attachment_2", <Attachment>{
		name: "attachment_2",
		url: "https://attachment_2",
	} as unknown as Attachment);

	const result = target.buildForwardedMessageFileEmbeds(message, "en");

	expect(result).toHaveLength(2);
	expect(result[1].data).toEqual({
		color: config.colors.yellowbook,
		description: `File: **[attachment_2](https://attachment_2)**`,
		footer: {
			text: "Don't trust files from strangers",
		},
	});
});
