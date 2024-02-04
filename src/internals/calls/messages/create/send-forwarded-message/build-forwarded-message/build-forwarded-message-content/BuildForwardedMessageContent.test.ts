import { Numbers } from "@prisma/client";
import config from "@src/config/config";
import { PermissionLevel } from "@src/interfaces/commandData";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { getPerms } from "@src/internals/utils/get-perms/GetPerms";
import { isMemberAServerAdmin } from "@src/internals/utils/is-member-server-admin/IsMemberServerAdmin";
import { Message, User } from "discord.js";
import * as target from "./BuildForwardedMessageContent";

jest.mock("@src/internals/utils/get-perms/GetPerms");
jest.mock("@src/internals/utils/is-member-server-admin/IsMemberServerAdmin");
jest.mock("@src/internals/calls/notify-recipients/is-vip/isVIP");

const getPermsMock = jest.mocked(getPerms);
const isMemberAServerAdminMock = jest.mocked(isMemberAServerAdmin);
const isVIPMock = jest.mocked(isVIP);

let call: CallsWithNumbers;
let thisSideChannelId: string;
let thisSideNumber: Numbers;
let otherSideNumber: Numbers;
let message: Message;

beforeEach(() => {
	getPermsMock.mockResolvedValue(PermissionLevel.none);
	isVIPMock.mockReturnValue(false);

	thisSideChannelId = "this_side_channel";
	thisSideNumber = buildTestNumber({
		number: "this_side",
		channelID: thisSideChannelId,
	});
	otherSideNumber = buildTestNumber({
		number: "other_side",
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
	message.channelId = thisSideChannelId;
	message.author = {
		id: "user_id1234",
		username: "john",
		discriminator: "0",
	} as User;
});

it("should include the correct phone for a normal permission level", async() => {
	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes(config.callPhones.default)).toBe(true);
});

it("should include the correct phone for a server admin", async() => {
	isMemberAServerAdminMock.mockReturnValue(true);

	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes(config.callPhones.admin)).toBe(true);
});

it("should anonymise hidden VIPs", async() => {
	thisSideNumber.vip = {
		hidden: true,
		expiry: new Date(),
		name: "",
	};
	isVIPMock.mockReturnValue(true);

	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes(`Anonymous#1234`)).toBe(true);
});

it("should not anonymise hidden expired", async() => {
	otherSideNumber.vip = {
		hidden: true,
		expiry: new Date(),
		name: "",
	};
	isVIPMock.mockReturnValue(false);

	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes("john")).toBe(true);
});

it("should add IDs if customer support is on the other side", async() => {
	otherSideNumber.number = config.aliasNumbers["*611"];

	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes("(user_id1234)")).toBe(true);
});


it("should include the message content", async() => {
	const result = await target.buildForwardedMessageContent(message, call);

	expect(result.includes("Hello world!")).toBe(true);
});

it("end to end content test", async() => {
	const result = await target.buildForwardedMessageContent(message, call);

	expect(result).toStrictEqual(`**john** ${config.callPhones.default} Hello world!`);
});
