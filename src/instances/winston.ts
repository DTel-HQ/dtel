import Console from "@src/internals/console";

const winston = Console(`Shard ${process.env.SHARDS}`);

export { winston };
