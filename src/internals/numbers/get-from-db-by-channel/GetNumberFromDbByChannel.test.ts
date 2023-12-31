import { Numbers } from "@prisma/client";
import * as target from "./GetNumberFromDbByChannel";
import { prismaMock } from "@src/mocks/prisma.test";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

let numberMock: Numbers;

beforeEach(() => {
	numberMock = buildTestNumber();

	prismaMock.numbers.findUnique.mockResolvedValue(numberMock);
});

it("should get a number by channel from the db", async() => {
	await target.getNumberFromDbByChannel(numberMock.channelID);

	expect(prismaMock.numbers.findUnique).toHaveBeenCalledWith({
		where: {
			channelID: numberMock.channelID,
		},
	});
});
