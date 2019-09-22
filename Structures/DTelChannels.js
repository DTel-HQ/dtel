module.exports = Discord => {
	let extend = Structure => {
		class DTelChannel extends Structure {
			get number() {
				return r.table("Numbers").getAll(this.id, { index: "channel" }).nth(0).default(null);
			}

			get call() {
				return (async() => {
					let call = await r.table("Calls").getAll(this.id, { index: "fromChannel" }).nth(0).default(false);
					if (!call) call = await r.table("Calls").getAll(this.id, { index: "toChannel" }).nth(0).default(false);
					return call;
				})();
			}
		}
		return DTelChannel;
	};

	Discord.Structures.extend("TextChannel", TextChannel => extend(TextChannel));
	Discord.Structures.extend("DMChannel", DMChannel => extend(DMChannel));
};
