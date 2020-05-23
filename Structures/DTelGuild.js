module.exports = Discord => {
	Discord.Structures.extend("Guild", Guild => {
		class DTelGuild extends Guild {
			get whitelisted() {
				return r.table("Whitelist").get(this.id).default(false);
			}

			blacklist() {
				if (this.blacklisted === true) return false;
				this.blacklisted = true;
				return r.table("Blacklist").insert({ id: this.id });
			}

			get blacklisted() {
				return r.table("Blacklist").get(this.id).default(false);
			}

			unBlacklist() {
				if (!this.blacklisted) return false;
				this.blacklisted = false;
				return r.table("Blacklist").get(this.id).delete();
			}

			get numbers() {
				return r.table("Numbers").getAll(this.id, { index: "guild" }).default(null);
			}
		}
		return DTelGuild;
	});
};
