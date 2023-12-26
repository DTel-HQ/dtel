import { createCallInDb } from "@src/internals/calls/create-in-db/CreateInDb";
// import type { CallInitiationParams } from "./initiate";
import * as target from "./initiate";
import { CallParticipant, getParticipantsFromNumbers } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { advanceTo } from "jest-date-mock";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { generateUUID } from "@src/internals/utils/generateUUID";
import { ActiveCalls } from "@prisma/client";

jest.mock("@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers");
jest.mock("@src/internals/utils/generateUUID");
jest.mock("@src/internals/calls/create-in-db/CreateInDb");

const getParticipantsFromNumbersMock = jest.mocked(getParticipantsFromNumbers);
const generateUUIDMock = jest.mocked(generateUUID);
const createInDbMock = jest.mocked(createCallInDb);

let initiateTestParams: target.CallInitiationParams;
let fromParticipant: CallParticipant;
let toParticipant: CallParticipant;

beforeEach(() => {
	initiateTestParams = {
		fromNum: "03010000001",
		toNum: "03010000002",
		isRandom: false,
		startedBy: "me",
	};

	generateUUIDMock.mockReturnValue("uuid");

	fromParticipant = buildTestParticipant({
		number: "03010000001",
	});
	toParticipant = buildTestParticipant({
		number: "03010000002",
	});

	getParticipantsFromNumbersMock.mockResolvedValue({
		to: toParticipant,
		from: fromParticipant,
	});
});

advanceTo(new Date("2023-12-26T15:35:18.705Z"));

describe("fails", () => {
	describe("from number length", () => {
		it("should throw invalidInitializer the number is too short", () => {
			initiateTestParams.fromNum = "12345";

			expect(getTestableFunc()).rejects.toThrow("invalidInitializer");
		});

		it("should throw invalidInitializer the number is too long", () => {
			initiateTestParams.fromNum = "12345678901234567";

			expect(getTestableFunc()).rejects.toThrow("invalidInitializer");
		});
	});

	describe("to number length", () => {
		it("should throw numberInvalid the number is too short", () => {
			initiateTestParams.toNum = "12345";

			expect(getTestableFunc()).rejects.toThrow("numberInvalid");
		});

		it("should throw numberInvalid the number is too long", () => {
			initiateTestParams.toNum = "12345678901234567";

			expect(getTestableFunc()).rejects.toThrow("numberInvalid");
		});
	});

	it("should throw callingSelf if the to and from numbers are equal", () => {
		initiateTestParams.toNum = initiateTestParams.fromNum;

		expect(getTestableFunc()).rejects.toThrow("callingSelf");
	});

	describe("participants from DB tests", () => {
		describe("'from' side from db tests", () => {
			it("should throw invalidFrom if no from participant returned", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: toParticipant,
					from: undefined,
				});

				expect(getTestableFunc()).rejects.toThrow("invalidFrom");
			});

			it("should throw thisSideExpired if from participant number has expired", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: toParticipant,
					from: {
						...fromParticipant,
						expiry: new Date("2021-01-01T15:35:18.705Z"),
					},
				});

				expect(getTestableFunc()).rejects.toThrow("thisSideExpired");
			});
		});

		describe("'to' side from db tests", () => {
			it("should throw otherSideNotFound if no to participant returned", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: undefined,
					from: fromParticipant,
				});

				expect(getTestableFunc()).rejects.toThrow("otherSideNotFound");
			});

			it("should throw otherSideExpired if from participant number has expired", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: {
						...toParticipant,
						expiry: new Date("2021-01-01T15:35:18.705Z"),
					},
					from: fromParticipant,
				});

				expect(getTestableFunc()).rejects.toThrow("otherSideExpired");
			});

			it("should throw otherSideBlockedYou if the number is blocked", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: {
						...toParticipant,
						blocked: [fromParticipant.number],
					},
					from: fromParticipant,
				});

				expect(getTestableFunc()).rejects.toThrow("otherSideBlockedYou");
			});

			it("should throw otherSideInCall if the to side is in a call", () => {
				getParticipantsFromNumbersMock.mockResolvedValueOnce({
					to: {
						...toParticipant,
						incomingCalls: [buildTestCall()],
					},
					from: fromParticipant,
				});

				expect(getTestableFunc()).rejects.toThrow("otherSideInCall");
			});
		});
	});
});

describe("successes", () => {
	it("should create a call in the db if all inputs are valid", async() => {
		await target.initiateCall(initiateTestParams);

		expect(createCallInDb).toHaveBeenCalledWith({
			id: "uuid",
			fromNum: fromParticipant.number,
			toNum: toParticipant.number,
			randomCall: false,
			started: {
				at: new Date(),
				by: "me",
			},
		});
	});
});

type Testable = () => void;
const getTestableFunc = (): Testable => () => target.initiateCall(initiateTestParams);
