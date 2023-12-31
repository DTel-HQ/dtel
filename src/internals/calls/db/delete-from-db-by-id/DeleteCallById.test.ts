import { prismaMock } from "@src/mocks/prisma.test";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { ActiveCalls } from "@prisma/client";
import * as target from "./DeleteCallById";

let testCall: ActiveCalls;

beforeEach(() => {
	testCall = buildTestCall();

	prismaMock.activeCalls.delete.mockResolvedValue(testCall);
});

it("should try to delete the call", async() => {
	const result = await target.deleteCallById(testCall.id);

	expect(result).toEqual(testCall);
	expect(prismaMock.activeCalls.delete).toHaveBeenCalledTimes(1);
});
