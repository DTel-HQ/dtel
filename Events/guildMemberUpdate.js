module.exports = async(oldMember, newMember) => {
	if (oldMember.guild.id !== config.supportGuild) return;
	const diff = oldMember.roles.cache.difference(newMember.roles.cache);
	if (diff.size) require("../Internals/modules").update(newMember);
};
