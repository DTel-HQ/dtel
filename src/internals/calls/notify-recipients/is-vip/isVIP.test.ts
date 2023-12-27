import { Numbers } from "@prisma/client";
import * as target from "./isVIP";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

jest.useFakeTimers();

let number: Numbers;

beforeEach(() => {
	number = buildTestNumber({
		vip: {
			expiry: new Date("2023-12-26T15:35:18.705Z"),
			hidden: false,
			name: "test",
		},
	});
});

it("should return true if the VIP period has not expired", () => {
	jest.setSystemTime(new Date("2022-01-01T15:35:18.705Z"));

	const result = target.isVIP(number);
	expect(result).toBe(true);
});

it("should return false if the VIP period has expired", () => {
	jest.setSystemTime(new Date("2024-01-01T15:35:18.705Z"));

	const result = target.isVIP(number);
	expect(result).toBe(false);
});

it("should return false if there are no VIP details", () => {
	number.vip = null;

	const result = target.isVIP(number);
	expect(result).toBe(false);
});
