import { Numbers } from "@prisma/client";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import * as target from "./GetCallerDisplay";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";

jest.mock("@src/internals/calls/notify-recipients/is-vip/isVIP");

const isVIPMock = jest.mocked(isVIP);

let number: Numbers;

beforeEach(() => {
	number = buildTestNumber();
	isVIPMock.mockReturnValue(true);
});

it("should return the number if they are not a VIP", () => {
	isVIPMock.mockReturnValue(false);

	const result = target.getCallerDisplay(number);

	expect(result).toStrictEqual("03010000001");
});

describe("if they are a VIP", () => {
	beforeEach(() => {
		number.vip = {
			expiry: new Date(),
			hidden: false,
			name: "",
		};

		isVIPMock.mockReturnValue(true);
	});

	describe("if their details are hidden", () => {
		beforeEach(() => {
			number.vip!.hidden = true;
		});

		describe("if they have a display name", () => {
			beforeEach(() => {
				number.vip!.hidden = true;
				number.vip!.name = "Display Name";
			});

			it("should show their display name", () => {
				const result = target.getCallerDisplay(number);

				expect(result).toStrictEqual("Display Name");
			});
		});
		describe("if they do not have a display name", () => {
			beforeEach(() => {
				number.vip!.hidden = true;
				number.vip!.name = "";
			});

			it("should show 'Hidden'", () => {
				const result = target.getCallerDisplay(number);

				expect(result).toStrictEqual("Hidden");
			});
		});
	});
	describe("if their details are shown", () => {
		beforeEach(() => {
			number.vip!.hidden = false;
		});

		describe("if they have a display name", () => {
			beforeEach(() => {
				number.vip!.name = "Display Name";
			});

			it("should show their display name and number", () => {
				const result = target.getCallerDisplay(number);

				expect(result).toStrictEqual("Display Name (03010000001)");
			});
		});

		describe("if they do not have a display name", () => {
			beforeEach(() => {
				number.vip!.name = "";
			});


			it("should show their number", () => {
				const result = target.getCallerDisplay(number);

				expect(result).toStrictEqual("03010000001");
			});
		});
	});
});
