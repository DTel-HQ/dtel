export const getShardCount = (): number => process.env.SHARD_COUNT ? Number(process.env.SHARD_COUNT) : 1;
