import Console from "@src/internals/console";

// lol
const winston = Console(`Shard${process.env.SHARDS ? ` ${process.env.SHARDS}` : "er"}`);

export { winston };
