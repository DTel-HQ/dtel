const { Structures } = require("discord.js");

module.exports = () => {
	Structures.extend("Guild", Guild => {
		class DTelGuild extends Guild {
			get whitelisted() {
				return !!r.table("Whitelist").get(this.id);
			}

			get blacklisted() {
				return !!r.table("Blacklist").get(this.id);
			}
		}
		return DTelGuild;
	});
};
