import { Numbers } from "@prisma/client";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { buildForwardedMessageOptions } from "@src/internals/calls/messages/utils/BuildForwardedMessageOptions";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { APIMessage, EmbedBuilder, Message, User } from "discord.js";
import * as target from "./SendForwardedMessage";

jest.mock("@src/internals/calls/messages/utils/BuildForwardedMessageOptions");

const buildForwardedMessageOptionsMock = jest.mocked(buildForwardedMessageOptions);

let call: CallsWithNumbers;
let thisSideNumber: Numbers;
let otherSideNumber: Numbers;
let message: Message;
let mockAttachmentEmbed: EmbedBuilder;

beforeEach(() => {
	mockAttachmentEmbed = new EmbedBuilder();
	buildForwardedMessageOptionsMock.mockResolvedValue({
		content: "mock content",
		embeds: [mockAttachmentEmbed],
	});

	discordClientMock.sendCrossShard.mockResolvedValue({
		id: "fwd_message_id",
	} as APIMessage);

	thisSideNumber = buildTestNumber({
		number: "this_side",
		channelID: "this_side_channel",
	});
	otherSideNumber = buildTestNumber({
		number: "other_side",
		channelID: "other_side_channel",
	});

	call = {
		...buildTestCall(),
		toNum: "this_side",
		fromNum: "other_side",
		to: thisSideNumber,
		from: otherSideNumber,
	};

	message = {} as Message;
	message.content = "Hello world!";
	message.channelId = "this_side_channel";
	message.author = {
		id: "user_id1234",
		username: "john",
		discriminator: "0",
	} as User;
});

it("should try to get forwarded message content", async() => {
	await target.sendForwardedMessage(message, call);

	expect(buildForwardedMessageOptionsMock).toHaveBeenCalled();
});

it("should send the message payload to the right channel", async() => {
	await target.sendForwardedMessage(message, call);

	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		content: "mock content",
		embeds: [mockAttachmentEmbed],
	}, "other_side_channel");
});

it("should return a message ID", async() => {
	const result = await target.sendForwardedMessage(message, call);

	expect(result).toStrictEqual("fwd_message_id");
});
