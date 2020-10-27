module.exports = {
	numberIsValid,
	updatePerms,
};

async function numberIsValid(channel, number) {
	if (!channel || !number) return new Error("Missing arguments");
	if (typeof channel !== "object") channel = await client.channels.cache.fetch(channel);
	if (!channel) return new Error("Couldn't find channel");
	if (number.length !== 11) return false;
	number = client.replaceNumber(number);
	if (!/^0(900|30\d|8(00|44))\d{7}$/.test(number)) return false;
	if ((channel.type !== "dm" && number.startsWith("0900")) || (channel.type === "dm" && number.startsWith("03"))) return false;
	return number;
}

function updatePerms(member) {
	if (member.guild.id !== config.supportGuild) throw new Error("Member should be in support server");
	const perms = {
		boss: config.bossRole,
		manager: config.managerRole,
		support: config.supportRole,
		donator: config.donatorRole,
		contributor: config.contributorRole,
	};
	const obj = {};
	for (let perm of Object.keys(perms)) if (member.roles.cache.has(perms[perm])) obj[perm] = true; else obj[perm] = false;
	for (let perm of Object.keys(obj)) member.user[perm] = obj[perm];
	return r.table("Accounts").get(member.id).update(obj).then(() => obj);
}
