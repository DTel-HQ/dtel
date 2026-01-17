import * as target from "./GetShardID";

it("should return 0 if we are not sharding", () => {
	delete process.env.SHARDS;

	const result = target.getShardID();

	expect(result).toEqual(0);
});

it("should return the shard id from env if present", () => {
	process.env.SHARDS = "4";

	const result = target.getShardID();

	expect(result).toEqual(4);
});
