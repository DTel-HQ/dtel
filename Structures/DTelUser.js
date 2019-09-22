module.exports = Discord => {
	Discord.Structures.extend("User", User => {
		class DTelUser extends User {
			constructor(...arg) {
				super(...arg);
				this.blacklisted = false;
				this.busy = false;
				this.prefix = config.prefix;
				this.maintainer = config.maintainers.includes(this.id);
				this.boss = false;
				this.manager = false;
				this.support = false;
				this.donator = false;
				this.loadedPerms = false;
				this.setPerms();
				this.init();
			}

			async init() {
				let blacklisted = await r.table("Blacklist").get(this.id).default(false);
				this.blacklisted = !!blacklisted;

				let account = await this.account;
				if (account.prefix) this.prefix = account.prefix;
				return true;
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

			async setPerms() {
				this.loadedPerms = true;
				let member = await this.client.api.guilds(config.supportGuild).members(this.id).get().catch(e => null);
				let roles = member ? member.roles || [] : [];
				if (roles.includes(config.bossRole)) this.boss = true;
				if (roles.includes(config.managerRole)) this.manager = true;
				if (roles.includes(config.supportRole)) this.support = true;
				if (roles.includes(config.donatorRole)) this.donator = true;
				if (config.maintainers.includes(this.id)) {
					this.boss = true;
					this.manager = true;
					this.support = true;
					this.donator = true;
				}
				return this.getPerms();
			}

			async getPerms() {
				return {
					boss: this.boss,
					manager: this.manager,
					support: this.support,
					donator: this.donator,
				};
			}
		}
		return DTelUser;
	});
};
