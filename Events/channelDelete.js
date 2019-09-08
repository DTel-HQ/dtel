module.exports = async channel => {
	if (channel.type != "text") return;
	let number = (await r.table("Numbers").filter({ channel: channel.id }))[0];
	if (!number) return;
	await r.table("Numbers").get(number.id).delete();
	await r.table("Phonebook").get(number.id).delete();
	await r.table("Mailbox").get(channel.id).delete();
	client.log(`📕 Number \`${number.id}\` has automatically been deassigned.`);
};
