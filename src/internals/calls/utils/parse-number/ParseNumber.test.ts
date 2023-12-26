import * as target from "./ParseNumber";

it("should replace letters with corresponding numbers", () => {
	const result = target.parseNumber("0301DISCORD");

	expect(result).toStrictEqual("03013472673");
});

it("should not replace numbers if no letters provided", () => {
	const result = target.parseNumber("03011234567");

	expect(result).toStrictEqual("03011234567");
});
