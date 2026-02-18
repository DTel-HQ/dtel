import * as target from "./EndMissedCallInDb";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { prismaMock } from "@src/mocks/prisma.test";
import { deleteCallFromCache } from "@src/redis/operations/DeleteCallFromCache";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

jest.mock("@src/redis/operations/DeleteCallFromCache");
const deleteCallFromCacheMock = jest.mocked(deleteCallFromCache);

let call: CallsWithNumbers;

beforeEach(() => {
	call = {
		...buildTestCall(),
		to: buildTestNumber(),
		from: buildTestNumber(),
	};
});

describe("when the function is called", () => {
	beforeEach(async() => {
		await target.endMissedCallInDb(call);
	});

	it("should delete the call from the calls cache", () => {
		expect(deleteCallFromCacheMock).toHaveBeenCalledWith(call.id);
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
