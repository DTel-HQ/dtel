import * as target from "./IsThisShardID";

beforeEach(() => {
	process.env.SHARDS = "4";
});

it("should return true if ", () => {
	const result = target.isThisShardID(4);

	expect(result).toBe(true);
});

it("should return false if a different shard ID is provided", () => {
	const result = target.isThisShardID(3);

	expect(result).toBe(false);
});
