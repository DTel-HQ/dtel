module.exports = async member => {
	const guild = member.guild;
	const numbers = (await r.table("Numbers").getAll(guild.id, { index: "guild" }).default([])).filter(n => n.mentions);

	if (!numbers.length) return;

	let n, p;
	for (let i = 0; i < numbers.length; i++) {
		n = numbers[i];
		if (!n || !n.mentions) continue;
		p = n.mentions.indexOf(`<@${member.id}>`);
		if (p < 0) continue;
		n.mentions.splice(p, 1);
		r.table("Numbers").get(n.id).update({ mentions: n.mentions });
	}
};
