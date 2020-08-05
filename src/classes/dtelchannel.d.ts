import * as djs from 'discord.js';

export default class DTelChannel extends djs.Channel {
    get number(): Array<number>;

    get call(): boolean;
}