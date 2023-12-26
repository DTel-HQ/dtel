import config from "@src/config/config";
import * as target from "./ReplaceNumberAlias";

jest.mock("@src/config/config");
jest.replaceProperty(config, "aliasNumbers", {
	"*611": "08007877678",
});

it("should replace an alias", () => {
	const result = target.replaceNumberAlias("*611");

	expect(result).toStrictEqual("08007877678");
});

it("should not replace a standard number", () => {
	const result = target.replaceNumberAlias("08001234567");

	expect(result).toStrictEqual("08001234567");
});

