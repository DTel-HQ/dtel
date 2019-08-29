module.exports = async guild => {
	client.log(`📥 Left guild \`${guild.id}\`(${guild.name}). Currently in ${client.guilds.size} servers on shard ${client.shard.ids[0]}`);
	let numbers = await r.table("Numbers").filter({ guild: guild.id });
	let mailboxes = await r.table("Mailbox").filter({ guild: guild.id });
	if (!numbers) return;

	setTimeout(async() => {
		guild = await client.guilds.get(guild.id);
		if (guild) return;
		for (let number of numbers) {
			client.log(`📕 Number \`${number.id}\` has automatically been deassigned after leaving \`${guild.id}\`.`);
			r.table("Numbers").get(number.id).delete();
			r.table("Phonebook").get(number.id).delete()
				.catch(e => null);
		}
		for (let mailbox of mailboxes) {
			r.table("Mailbox").get(mailbox.id).delete();
		}
	}, 20 * 60 * 1000);
};
