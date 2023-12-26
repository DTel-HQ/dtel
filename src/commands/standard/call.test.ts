import { ChatInputCommandInteraction } from "discord.js";
import target from "./call";
import CallClient from "../../internals/callClient.old";
import { Numbers } from "@prisma/client";

jest.mock("../../internals/callClient.old");

const callClientMock = jest.mocked(CallClient);
const callInitMock = jest.fn();
const editReplyMock = jest.fn();
const deferReplyMock = jest.fn();

describe("call function test", () => {
	let interaction: ChatInputCommandInteraction;
	let toNum: string;
	let fromNum: Numbers;
	let random: boolean;
	beforeEach(() => {
		callClientMock.mockImplementation(() => ({
			initiate: callInitMock,
		}) as unknown as CallClient);

		interaction = {
			locale: "en-GB",
		} as ChatInputCommandInteraction;
		interaction.editReply = editReplyMock;
		interaction.deferReply = deferReplyMock;
		toNum = "03010000002";

		fromNum = {
			blocked: [],
			channelID: "channel",
			contacts: [],
			createdAt: new Date("2023-12-26T14:25:01.251Z"),
			expiry: new Date("2023-12-30T14:25:01.251Z"),
			fka: [],
			guildID: "guild",
			mentions: [],
			number: "03010000001",
			vip: null,
			userID: null,
			waiting: false,
		};
	});

	it("should defer reply if alreadyReplied is false", () => {
		const alreadyReplied = false;
		target.call(interaction, toNum, fromNum, random, alreadyReplied)

		expect(deferReplyMock).toHaveBeenCalled();
	});

	it("should not defer reply if alreadyReplied is false", () => {
		const alreadyReplied = false;
		target.call(interaction, toNum, fromNum, random, alreadyReplied)

		expect(deferReplyMock).not.toHaveBeenCalled();
	});
});