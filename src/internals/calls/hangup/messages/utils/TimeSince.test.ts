import * as target from "./TimeSince";
jest.useFakeTimers();

jest.setSystemTime(new Date(2024, 2, 10, 1, 20));

it("should return the time since a date", () => {
	const result = target.timeSince(new Date(2024, 2, 10, 0));

	expect(result).toBe("an hour");
});
