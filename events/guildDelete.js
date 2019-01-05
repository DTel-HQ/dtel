module.exports = async guild => {
	let numbers = await r.table("Numbers").filter({ guild: guild.id });
	if (!numbers) return;

	setTimeout(async() => {
		guild = await client.guilds.get(guild.id);
		if (guild) return;
		for (let i in numbers) {
			r.table("Numbers").get(numbers[i]).delete();
		}
	}, 10 * 60 * 1000);
};
