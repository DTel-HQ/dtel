import * as target from "./BuildTestMailbox";

it("should return a test mailbox", () => {
	const result = target.buildTestMailbox();

	expect(result).toStrictEqual({
		number: "03010000001",
		autoreply: "auto_reply",
		messages: [],
		receiving: true,
	});
});

it("should respect provided properties", () => {
	const result = target.buildTestMailbox({
		messages: [{
			from: "me",
			id: "id",
			message: "message",
			sent: {
				at: new Date(0),
				by: "me",
			},
		}],
	});

	expect(result).toStrictEqual({
		number: "03010000001",
		autoreply: "auto_reply",
		receiving: true,
		messages: [{
			from: "me",
			id: "id",
			message: "message",
			sent: {
				at: new Date(0),
				by: "me",
			},
		}],
	});
});
