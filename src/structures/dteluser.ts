import * as djs from 'discord.js';
import Account from "../classes/account";
import { util } from 'interfaces';
import * as config from '../configuration/config';
import DTelGuild from 'src/classes/dtelguild';

export default (consts: util) => {
    djs.Structures.extend("User", (User) => {
        class DTelUser extends User {
            private _busy = false;
            public boss = false;
            public donator = false;
            public support = false;
            public manager = false;
        
            constructor(Client: djs.Client, ...arg: any[]) {
                super(Client, arg);
            };
        
            account() {
                return (async () => {
                    return await new Account(this.id, consts);
                })();
            };

            blacklist() {
                return (async() => {
                    if(await this.blacklisted) return false;
                    consts.client.guilds.cache.forEach((g: djs.Guild) => {
                        if(g.ownerID === this.id){
                            (g as DTelGuild).blacklist();
                        }
                    }) 
                    return await consts.db.blacklist.r.table('Blacklist').insert({ id: this.id });
                })();
            };

            get blacklisted(){
                return (async() => {
                    return await consts.db.blacklist.r.table('Blacklist').get(this.id).default(false);
                })();
            };

            unBlacklist(){
                return(async() => {
                    if(!await this.blacklisted) return false;
                    return await consts.db.blacklist.r.table('Blacklist').get(this.id).delete();
                })();
            };

            get busy(){
                return this._busy;
            };

            set busy(bool){
                if(typeof(bool) == 'boolean') this._busy = bool;
            };

            set cooldown(type: string){
                (async() => {
                    const time = config.cooldowns.get(type);
                    if(!time) return;
                    const endTime = Date.now() + (time*1000);

                    const cooldown = await consts.db.cooldowns.r.table('Cooldowns').get(`${this.id}-${type}`);
                    if(!cooldown) await consts.db.cooldowns.r.table('Cooldowns').insert({ id: `${this.id}-${type}`, time: endTime});
                    else await consts.db.cooldowns.r.table('Cooldowns').get(`${this.id}-${type}`).update({ time: endTime });
                })();
            };

            getPerms(){
                return {
                    boss: this.boss,
                    manager: this.manager,
                    support: this.support,
                    donator: this.support
                }
            }
        }
        return DTelUser;
    });
}