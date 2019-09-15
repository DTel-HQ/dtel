const { Structures } = require("discord.js");

module.exports = () => {
	Structures.extend("Guild", Guild => {
		class DTelGuild extends Guild {
			get whitelisted() {
				return r.table("Whitelist").get(this.id).default(false);
			}

			get blacklisted() {
				return r.table("Blacklist").get(this.id).default(false);
			}

			get numbers() {
				return r.table("Numbers").getAll(this.id, { index: "guild" }).default(null);
			}
		}
		return DTelGuild;
	});
};
