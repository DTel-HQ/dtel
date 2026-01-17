export const getShardID = (): number => process.env.SHARDS ? Number(process.env.SHARDS) : 0;
