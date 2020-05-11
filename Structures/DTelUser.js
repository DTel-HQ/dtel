module.exports = Discord => {
	Discord.Structures.extend("User", User => {
		class DTelUser extends User {
			constructor(...arg) {
				super(...arg);
				this.busy = false;
				this.init();
			}

			async init() {
				let blacklisted = await r.table("Blacklist").get(this.id).default(false);
				if (blacklisted) this.blacklisted = true;
				let account = await this.account();
				if (account.prefix) this.prefix = account.prefix;
				return true;
			}

			account(insert) {
				return (async() => {
					let account = await r.table("Accounts").get(this.id).default({ id: this.id, balance: 0, template: true });
					if (account.template && insert) await r.table("Accounts").insert(account);
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

			getPerms() {
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
