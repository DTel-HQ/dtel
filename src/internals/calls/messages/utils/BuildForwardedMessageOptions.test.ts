import { CallsWithNumbers } from "@src/internals/callClient.old";
import { buildForwardedMessageContent } from "@src/internals/calls/messages/utils/build-forwarded-message-content/BuildForwardedMessageContent";
import { buildForwardedMessageFileEmbeds } from "@src/internals/calls/messages/utils/build-forwarded-message-file-embeds/BuildForwardedMessageFileEmbeds";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { getNumberLocale } from "@src/internals/utils/get-number-locale/GetNumberLocale";
import { EmbedBuilder, Message, User } from "discord.js";
import * as target from "./BuildForwardedMessageOptions";

jest.mock("@src/internals/calls/messages/utils/build-forwarded-message-content/BuildForwardedMessageContent");
jest.mock("@src/internals/utils/get-number-locale/GetNumberLocale");
jest.mock("@src/internals/calls/messages/utils/build-forwarded-message-file-embeds/BuildForwardedMessageFileEmbeds");

const buildForwardedMessageContentMock = jest.mocked(buildForwardedMessageContent);
const getNumberLocaleMock = jest.mocked(getNumberLocale);
const buildForwardedMessageFileEmbedsMock = jest.mocked(buildForwardedMessageFileEmbeds);

let message: Message;
let call: CallsWithNumbers;

beforeEach(() => {
	buildForwardedMessageContentMock.mockResolvedValue("mock content");
	getNumberLocaleMock.mockResolvedValue("en");
	buildForwardedMessageFileEmbedsMock.mockReturnValue(["not really an embed" as unknown as EmbedBuilder]);

	message = {} as Message;
	message.content = "Hello world!";
	message.channelId = "thisSideChannelId";
	message.author = {
		id: "user_id1234",
		username: "john",
		discriminator: "0",
	} as User;

	call = {
		...buildTestCall(),
		to: buildTestNumber(),
		from: buildTestNumber(),
	};
});

it("should generate a message payload", async() => {
	const result = await target.buildForwardedMessageOptions(message, call as CallsWithNumbers);

	expect(result).toEqual({
		embeds: ["not really an embed"],
		content: "mock content",
	});
});
