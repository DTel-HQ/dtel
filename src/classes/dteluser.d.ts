import * as djs from 'discord.js';
import Account from './account';

export default class DTelUser extends djs.User {
    private _busy: boolean;
    public boss: boolean;
    public donator: boolean;
    public support: boolean;
    public manager: boolean;

    get account(): Account;

    blacklist(): void;

    get blacklisted(): boolean;

    unBlackList(): void;

    get busy(): boolean;

    set busy(bool: boolean);

    set cooldown(type: String);

    get getPerms(): Array<boolean>;
}