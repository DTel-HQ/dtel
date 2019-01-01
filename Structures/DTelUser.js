const { Structures } = require("discord.js");

module.exports = () => {
	Structures.extend("User", User => {
		class DTelUser extends User {
			async getPerms() {
				let toRet = {
					boss: false,
					manager: false,
					support: false,
					donator: false,
				};
				return this.client.api.guilds(config.supportGuild).members(this.id).get()
					.then(member => {
						if (config.maintainers.includes(this.id)) toRet = { boss: true, manager: true, support: true, donator: true };
						if (member.roles.includes(config.bossRole)) toRet.boss = true;
						if (member.roles.includes(config.managerRole)) toRet.manager = true;
						if (member.roles.includes(config.supportRole)) toRet.support = true;
						if (member.roles.includes(config.donatorRole)) toRet.donator = true;
						return toRet;
					})
					.catch(() => toRet);
			}
		}
		return DTelUser;
	});
};
