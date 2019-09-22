const { Structures } = require("discord.js");

module.exports = () => {
	Structures.extend("User", User => {
		class DTelUser extends User {
			constructor(...arg) {
				super(...arg);
				this.blacklisted = (async() => {
					let bl = await r.table("Blacklist").get(this.id).default(false);
					return bl;
				})();
				this.prefix = (async() => {
					let acc = await r.table("Accounts").get(this.id);
					return acc ? acc.prefix || config.prefix : config.prefix;
				})();
			}

			get account() {
				return (async() => {
					let account = await r.table("Accounts").get(this.id);
					if (!account) {
						account = { id: this.id, balance: 0 };
						await r.table("Accounts").insert(account);
					}
					return account;
				})();
			}

			blacklist() {
				if (this.blacklisted === true) return false;
				this.blacklisted = true;
				return r.table("Blacklist").insert({ id: this.id });
			}

			unBlacklist() {
				if (!this.blacklisted) return false;
				this.blacklisted = false;
				return r.table("Blacklist").get(this.id).delete();
			}

			set cooldown(type) {
				(async() => {
					// ID: "[user]-[type]"
					// time (type) in seconds → time in ms
					let time = config.cooldowns[type];
					if (!time) return;
					let endTime = Date.now() + (time * 1000);

					// Insert into cooldowns
					let cooldown = await r.table("Cooldowns").get(`${this.id}-${type}`);
					if (!cooldown) await r.table("Cooldowns").insert({ id: `${this.id}-${type}`, time: endTime });
					else await r.table("Cooldowns").get(`${this.id}-${type}`).update({ time: endTime });
				})();
			}

			async getPerms() {
				let toRet = {
					boss: false,
					manager: false,
					support: false,
					donator: false,
				};
				if (config.maintainers.includes(this.id)) toRet = { boss: true, manager: true, support: true, donator: true };
				return this.client.api.guilds(config.supportGuild).members(this.id).get()
					.then(member => {
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
