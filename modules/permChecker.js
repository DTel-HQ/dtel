module.exports = async(client, user) => {
	if (client && user) {
		let toRet = {
			memberValid: false,
			boss: false,
			support: false,
			donator: false,
		};
		let member;
		try {
			member = await client.api.guilds(process.env.SUPPORTGUILD).members(user).get();
			if (!member) throw new Error();
			toRet.memberValid = true;
		} catch (err) {
			return toRet;
		}
		if (member.roles.includes(process.env.BOSSROLE)) toRet.boss = true;
		if (member.roles.includes(process.env.SUPPORTROLE)) toRet.support = true;
		if (member.roles.includes(process.env.DONATORROLE)) toRet.donator = true;
		return toRet;
	}
};
