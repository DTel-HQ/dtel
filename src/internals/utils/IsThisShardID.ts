import { getShardID } from "./GetShardID";

export const isThisShardID = (shardID: number) => getShardID() === shardID;
