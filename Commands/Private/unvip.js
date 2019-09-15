module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: 0xEEEEEE, title: "Command usage", description: "`>unvip [channel, channel mention, number]`\nCompletely removes the remaining VIP time from a number" } });

	let number;
	if (msg.mentions.channels) number = await r.table("Numbers").getAll(msg.mentions.channels.first().id, { index: "channel" }).nth(0).default(null);
	if (!number) number = await r.table("Numbers").get(client.replaceNumber(suffix));
	if (!number) number = await r.table("Numbers").getAll(suffix, { index: "channel" }).nth(0).default(null);
	if (!number) return msg.channel.send({ embed: { color: 0x660000, title: "Number not found", description: "Couldn't find a number or channel associated with your input." } });
	if (new Date(number.vip.expiry).getTime() < Date.now()) return msg.channel.send({ embed: { color: 0x66000, title: "Can't unvip", description: "This is not a VIP number" } });

	await r.table("Numbers").get(number.id).update({ vip: { expiry: new Date() } });
	msg.channel.send({ embed: { color: 0x00AF00, title: "Success", description: `VIP has succesfully been revoked from ${number.id}` } });
};
