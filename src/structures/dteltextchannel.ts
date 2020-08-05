// split into 2 files for a wacky fix

import * as djs from 'discord.js';
import { util } from 'interfaces';

export default (consts: util) => {
    djs.Structures.extend("TextChannel", (Channel) => {
        class DTelChannel extends Channel {
            get number(){
                return consts.db.numbers.r.table('Numbers').getAll(this.id, { index: "channel" }).nth(0).default(null);
            };

            get call(){
				return (async() => {
					let call = await consts.db.calls.r.table("Calls").getAll(this.id, { index: "fromChannel" }).nth(0).default(false);
					if (!call) call = await consts.db.calls.r.table("Calls").getAll(this.id, { index: "toChannel" }).nth(0).default(false);
					return call;
				})();
            }
        }
        return DTelChannel;
    });
}