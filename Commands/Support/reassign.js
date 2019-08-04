module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();
	let toReassign = suffix.split(" ")[0];
	let newNumber = client.replaceNumber(suffix.split(" ")[1]);

	if (!toReassign || !newNumber) return msg.reply("**Add a number or channel to reassign and the new number.**");
	let myNumber = await client.replaceNumber(toReassign);

	let numberDoc = msg.mentions.channels ? toReassign = msg.mentions.channels.first().id : await r.table("Numbers").get(myNumber).default(null);
	if (!numberDoc) numberDoc = (await r.table("Numbers").filter({ channel: toReassign }))[0];
	if (!numberDoc) return msg.reply("Number could not be found");

	let prefix = numberDoc.guild ? "0[38]0\\d" : "0[89]00";
	let regex = new RegExp(`^${prefix}\\d{7}$`);
	if (!regex.test(newNumber)) return msg.channel.send({ embed: { color: 0x660000, title: "Bad number", description: "Please make sure to enter a correct new number" } });
	let newNumberDoc = await r.table("Numbers").get(newNumber);
	if (newNumberDoc) return msg.channel.send({ embed: { color: 0x66000, title: "Duplicate number", description: "That number already exists" } });

	let numbervip = numberDoc.vip ? new Date(numberDoc.vip).getTime() > Date.now() : false;
	if (!numbervip && !perms.boss) return msg.reply("That number is not VIP");

	await r.table("Numbers").get(numberDoc.id).delete();
	newNumberDoc = numberDoc;
	newNumberDoc.id = newNumber;
	await r.table("Numbers").insert(numberDoc);

	let phonebook = await r.table("Phonebook").get(numberDoc.id);
	if (phonebook) {
		r.table("Phonebook").get(numberDoc.id).delete();
		phonebook.id = newNumber;
		await r.table("Phonebook").insert(phonebook);
	}

	await msg.reply("Number has been reassigned");
	await client.log(`:orange_book: Number \`${numbervip ? numberDoc.vip.hidden ? "hidden" : numberDoc.id : numberDoc.id}\` has been reassigned to \`${numbervip ? numberDoc.vip.hidden ? "hidden" : newNumber : newNumber}\` by ${msg.author.tag}.`);
};
