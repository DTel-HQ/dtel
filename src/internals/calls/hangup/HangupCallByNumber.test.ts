import * as target from "./HangupCallByNumber";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { getCallByNumber } from "@src/internals/calls/db/get-from-db-by-number/GetCallByNumber";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { ReplyableInteraction } from "@src/types/ReplyableInteraction";
import { calls, type CallsWithNumbers } from "@src/instances/calls";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { User } from "discord.js";
import { prismaMock } from "@src/mocks/prisma.test";

jest.mock("@src/internals/calls/db/get-from-db-by-number/GetCallByNumber");
jest.useFakeTimers();
jest.setSystemTime(new Date(2024, 5, 2));

jest.mock("@src/instances/calls", () => ({
	calls: new Map<string, CallsWithNumbers>(),
}));

const getCallByNumberMock = jest.mocked(getCallByNumber);

describe("given the call exists", () => {
	const call: CallsWithNumbers = {
		...buildTestCall(),
		from: buildTestParticipant({
			number: "03010000001",
		}),
		to: buildTestParticipant({
			number: "03010000002",
		}),
	};

	const interaction = {} as ReplyableInteraction;
	interaction.reply = jest.fn();
	interaction.user = {} as User;
	interaction.user.id = "user-id";

	calls.set(call.id, call);
	expect(calls.size).toBe(1);

	beforeEach(() => {
		getCallByNumberMock.mockResolvedValue(call);
	});

	describe("when the call gets hung up by the from side", () => {
		beforeEach(async() => {
			await target.hangupCallByNumber(call.from, interaction);
		});

		it("should send a reply to the side hanging up", () => {
			expect(interaction.reply).toHaveBeenCalled();
		});

		it("should send a reply to the other side", () => {
			expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith(expect.any(Object), call.toNum);
		});

		it("should create an archived call", () => {
			expect(prismaMock.archivedCalls.create).toHaveBeenCalledWith({
				data: {
					fromNum: call.fromNum,
					hold: call.hold,
					id: call.id,
					started: call.started,
					toNum: call.toNum,
					pickedUp: call.pickedUp,
					randomCall: call.randomCall,
					ended: {
						set: {
							at: new Date(2024, 5, 2),
							by: "user-id",
						},
					},
				},
			});
		});

		it("should should delete the active call", () => {
			expect(prismaMock.activeCalls.delete).toHaveBeenCalledWith({
				where: {
					id: call.id,
				},
			});
		});

		it("should remove the call from the cache", () => {
			expect(calls.size).toBe(0);
		});
	});
});
