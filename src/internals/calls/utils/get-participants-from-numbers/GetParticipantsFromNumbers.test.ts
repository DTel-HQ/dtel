import { prismaMock } from "@src/mocks/prisma";
import * as target from "./GetParticipantsFromNumbers";
import { CallParticipant } from "./GetParticipantsFromNumbers";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

const toNumber = buildTestNumber({
	number: "03010000001",
});
const fromNumber = buildTestNumber({
	number: "03010000002",
});

beforeEach(() => {
	prismaMock.numbers.findMany.mockResolvedValue(<CallParticipant[]>[
		toNumber,
		fromNumber,
	]);
});

it("should return the two participants", async() => {
	const result = await target.getParticipantsFromNumbers("03010000001", "03010000002");

	expect(result).toStrictEqual({
		to: toNumber,
		from: fromNumber,
	});
});
