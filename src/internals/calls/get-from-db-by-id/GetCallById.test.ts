import { prismaMock } from "@src/mocks/prisma.test";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { ActiveCalls, Numbers } from "@prisma/client";
import * as target from "./GetCallById";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

let testCall: ActiveCalls;
let testFromNumber: Numbers;

beforeEach(() => {
	testCall = buildTestCall();
	testFromNumber = buildTestNumber();

	prismaMock.activeCalls.findUnique.mockResolvedValue({
		...testCall,
		to: null,
		from: testFromNumber,
	} as unknown as target.CallsWithPotentialNumbers);
});

it("should try to get a call", async() => {
	const result = await target.getCallById(testCall.id);

	expect(result).toEqual({
		...testCall,
		to: null,
		from: testFromNumber,
	});
	expect(prismaMock.activeCalls.findUnique).toHaveBeenCalledTimes(1);
});
