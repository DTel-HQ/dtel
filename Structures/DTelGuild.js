module.exports = Discord => {
	Discord.Structures.extend("Guild", Guild => {
		class DTelGuild extends Guild {
			get whitelisted() {
				return r.table("Whitelist").get(this.id).default(false);
			}

			blacklist() {
				return (async() => {
					if (await this.blacklisted) return false;
					this.leave();
					await r.table("Numbers").getAll(this.id, { index: "guild" }).delete();
					return r.table("Blacklist").insert({ id: this.id });
				})();
			}

			get blacklisted() {
				return (async() => r.table("Blacklist").get(this.id).default(false))();
			}

			unBlacklist() {
				return (async() => {
					if (!await this.blacklisted) return false;
					return r.table("Blacklist").get(this.id).delete();
				})();
			}

			get numbers() {
				return r.table("Numbers").getAll(this.id, { index: "guild" }).default(null);
			}
		}
		return DTelGuild;
	});
};
