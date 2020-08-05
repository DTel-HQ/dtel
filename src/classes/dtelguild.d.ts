import * as djs from 'discord.js';

export default class DTelGuild extends djs.Guild {
    get whitelisted(): boolean;
    blacklist(): void;
    get blacklisted(): boolean;
    unBlackList(): void;
    get numbers(): Array<any> | undefined;
}