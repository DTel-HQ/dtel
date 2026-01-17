import { prismaMock } from "@src/mocks/prisma.test";
import * as target from "./CreateInDb";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { deleteCallById } from "@src/internals/calls/db/delete-from-db-by-id/DeleteCallById";

jest.mock("@src/internals/calls/db/delete-from-db-by-id/DeleteCallById");

const deleteCallByIdMock = jest.mocked(deleteCallById);

const mockCall = {
	...buildTestCall(),
	to: buildTestNumber(),
	from: buildTestNumber(),
};

beforeEach(() => {
	prismaMock.activeCalls.create.mockResolvedValue(mockCall);
});

it("should return the two participants", async() => {
	const result = await target.createCallInDb(mockCall);

	expect(result).toStrictEqual(mockCall);
	expect(prismaMock.activeCalls.create).toHaveBeenCalledTimes(1);
});

it("should throw if the call is created but numbers do not exist", async() => {
	prismaMock.activeCalls.create.mockResolvedValue({
		...mockCall,
		to: undefined,
		from: undefined,
	});

	await expect(target.createCallInDb(mockCall)).rejects.toThrow("Failed to create call in database: related participants not found.");
	expect(deleteCallByIdMock).toHaveBeenCalledWith(mockCall.id);
});
