import { Numbers } from "@prisma/client";
import * as target from "./HasNumberExpired";

jest.useFakeTimers();

it("should return true if the number has expired", () => {
	jest.setSystemTime(new Date("2024-01-01T15:35:18.705Z"));

	const number: Numbers = {} as Numbers;
	number.expiry = new Date("2023-12-26T15:35:18.705Z");

	const result = target.hasNumberExpired(number);
	expect(result).toBe(true);
});

it("should return false if the number has not expired", () => {
	jest.setSystemTime(new Date("2023-01-01T15:35:18.705Z"));

	const number: Numbers = {} as Numbers;
	number.expiry = new Date("2023-12-26T15:35:18.705Z");

	const result = target.hasNumberExpired(number);
	expect(result).toBe(false);
});
