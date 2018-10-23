const { Structures } = require("discord.js");

module.exports = async() => {
	Structures.extend("User", User => {
		class DTelUser extends User {
			getPerms() {
				let toRet = {
					boss: false,
					support: false,
					donator: false,
				};
				this.client.api.guilds(config.supportGuild).members(this.id).get()
					.then(member => {
						if (member.roles.includes(process.env.BOSSROLE)) toRet.boss = true;
						if (member.roles.includes(process.env.SUPPORTROLE)) toRet.support = true;
						if (member.roles.includes(process.env.DONATORROLE)) toRet.donator = true;
					})
					.catch(() => new Error("Could not find member."));
				return toRet;
			}
		}
		return DTelUser;
	});
};
