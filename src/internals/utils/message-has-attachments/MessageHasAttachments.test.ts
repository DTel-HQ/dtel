import * as target from "./MessageHasAttachments";
import { Attachment, Collection, Message } from "discord.js";

let message: Message;
let attachments: Collection<string, Attachment>;

beforeEach(() => {
	attachments = new Collection<string, Attachment>();
	message = {
		attachments,
	} as Message;
});

it("should return false if the attachments collection is empty", () => {
	const result = target.messageHasAttachments(message);

	expect(result).toBe(false);
});

it("should return true if the attachments collection has attachments", () => {
	attachments.set("id", {} as Attachment);
	const result = target.messageHasAttachments(message);

	expect(result).toBe(true);
});

