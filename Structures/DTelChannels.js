const { Structures } = require("discord.js");

module.exports = () => {
	Structures.extend("TextChannel", TextChannel => {
		class DTelChannel extends TextChannel {
			get number() {
				return r.table("Numbers").getAll(this.id, { index: "channel" }).nth(0).default(null);
			}

			get call() {
				return (async() => {
					let call = await r.table("Calls").getAll(this.id, { index: "fromChannel" }).nth(0).default(null);
					if (!call) call = await r.table("Calls").getAll(this.id, { index: "toChannel" }).nth(0).default(null);
					return call;
				})();
			}
		}
		return DTelChannel;
	});

	Structures.extend("DMChannel", DMChannel => {
		class DTelChannel extends DMChannel {
			get number() {
				return r.table("Numbers").getAll(this.id, { index: "channel" }).nth(0).default(null);
			}

			get call() {
				return (async() => {
					let call = await r.table("Calls").getAll(this.id, { index: "fromChannel" }).nth(0).default(null);
					if (!call) call = await r.table("Calls").getAll(this.id, { index: "toChannel" }).nth(0).default(null);
					return call;
				})();
			}
		}
		return DTelChannel;
	});
};
