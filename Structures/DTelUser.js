module.exports = Discord => {
	Discord.Structures.extend("User", User => {
		class DTelUser extends User {
			constructor(...arg) {
				super(...arg);
				this._busy = false;
				this.boss = false;
				this.donator = false;
				this.support = false;
				this.manager = false;
				this.contributor = false;
			}

			account(insert) {
				return (async() => {
					let account = await r.table("Accounts").get(this.id).default({ id: this.id, balance: 0, template: true });
					if (account.template && insert) await r.table("Accounts").insert(account);
					return account;
				})();
			}

			blacklist(reason) {
				return (async() => {
					if (await this.blacklisted) return false;
					const guilds = client.guilds.cache.filter(g => g.ownerID === this.id);
					guilds.forEach(g => g.blacklist());
					return r.table("Blacklist").insert({ id: this.id, reason: reason || "empty" });
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

			get busy() {
				return this._busy;
			}

			set busy(boolean) {
				if (boolean === true) this._busy = true;
				if (boolean === false) this._busy = false;
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
					donator: this.donator
				};
			}
		}
		return DTelUser;
	});
};
