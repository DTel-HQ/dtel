import * as target from "./GetShardCount";

it("should return 1 if we are not sharding", () => {
	delete process.env.SHARD_COUNT;

	const result = target.getShardCount();

	expect(result).toEqual(1);
});

it("should return the shard count from env if present", () => {
	process.env.SHARD_COUNT = "4";

	const result = target.getShardCount();

	expect(result).toEqual(4);
});
