import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import { ActiveCalls } from "@prisma/client";
import * as target from "./EndMissedCallInDb";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { calls } from "@src/instances/calls";
import { prismaMock } from "@src/mocks/prisma.test";

jest.mock("@src/instances/calls", () => ({
	calls: mockDeep<typeof calls>(),
}));

const callsMock = calls as DeepMockProxy<typeof calls>;

beforeEach(() => {
	mockReset(callsMock);
});

let call: ActiveCalls;

beforeEach(() => {
	call = buildTestCall();
});

describe("when the function is called", () => {
	beforeEach(async() => {
		await target.endMissedCallInDb(call);
	});

	it("should delete the call from the calls cache", () => {
		expect(callsMock.delete).toHaveBeenCalledWith(call.id);
	});

	it("should create an archived call", () => {
		expect(prismaMock.archivedCalls.create).toHaveBeenCalledWith({
			data: {
				...call,
				ended: {
					at: new Date(),
					by: "missed",
				},
			},
		});
	});

	it("should delete the active call from the db", () => {
		expect(prismaMock.activeCalls.delete).toHaveBeenCalledWith({
			where: {
				id: call.id,
			},
		});
	});
});
