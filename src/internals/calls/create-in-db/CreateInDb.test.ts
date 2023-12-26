import { prismaMock } from "@src/mocks/prisma";
import * as target from "./CreateInDb";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";

const mockCall = buildTestCall();

beforeEach(() => {
	prismaMock.activeCalls.create.mockResolvedValue(mockCall);
});

it("should return the two participants", async() => {
	const result = await target.createCallInDb(mockCall);

	expect(result).toStrictEqual(mockCall);
	expect(prismaMock.activeCalls.create).toHaveBeenCalledTimes(1);
});
