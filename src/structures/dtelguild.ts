import * as djs from 'discord.js';
import { util } from 'interfaces';

export default (consts: util) => {
    djs.Structures.extend("Guild", (Guild) => {
        class DTelGuild extends Guild {
            get whitelisted(){
                return consts.db.whitelist.r.table('Whitelist').get(this.id).default(false);
            };

            blacklist(){
                return(async()=>{
                    if(await this.blacklisted) return false;
                    this.leave();
                    await consts.db.numbers.r.table('Numbers').getAll(this.id, { index: "guild" }).delete();
                    return await consts.db.numbers.r.table('Blacklist').insert({ id: this.id });
                })();
            };

            get blacklisted(){
                return(async() => await consts.db.blacklist.r.table('Blacklist').get(this.id).default(false))();
            };

            unBlackList() {
                return (async()=>{
                    if(!await this.blacklisted) return false;
                    return consts.db.blacklist.r.table('Blacklist').get(this.id).delete();
                })();
            };

            get numbers(){
                return consts.db.numbers.r.table('Numbers').getAll(this.id, { index: "guild" }).default(null);
            };
        };
        return DTelGuild;
    });
};