import * as target from "./GetMentionsString";

it("should return a mentions string", () => {
	const result = target.getMentionsString([
		"0123",
		"<@4567>",
		"<@8910>",
	]);

	expect(result).toStrictEqual("<@0123> <@4567> <@8910>");
});
