module.exports = async(client, msg, suffix) => {
	let fromNumber = await msg.channel.number;
	if (!fromNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "This channel does not have a number. Run `>wizard` to create one." } });

	let phonebook = await r.table("Phonebook");
	if (!phonebook[0]) return msg.channel.send({ embed: { color: config.colors.error, title: "Empty book", description: "Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!" } });

	let cooldown = await r.table("Cooldowns").get(`${msg.author.id}-call`);
	if (cooldown && cooldown.time > Date.now() && !msg.author.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Cooldown", description: `Not so quick... you're under cooldown for another ${Math.round((cooldown.time - Date.now()) / 1000, 1)}s`, footer: { text: "Keep in mind that spamming a number will result in a strike/blacklist." } } });

	let toDial,
		toCall = false,
		inCall,
		expired,
		self,
		toDialDoc;

	let omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Searching...", description: "Currently checking numbers in the phonebook to call. \nThis may take a while." } });

	while (!toCall) {
		toDial = phonebook[Math.floor(Math.random() * phonebook.length)];
		if (!toDial) break;
		let call = await r.table("Calls").getAll(toDial.id, { index: "fromChannel" }).nth(0).default(null);
		if (!call) call = await r.table("Calls").getAll(toDial.id, { index: "toChannel" }).nth(0).default(null);
		let channel = await client.api.channels(toDial.channel).get().catch(e => null);
		if (fromNumber.id == toDial.id || call || (msg.guild && channel && channel.guild_id === msg.guild.id)) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toDialDoc = await r.table("Numbers").get(toDial.id);
		if (new Date(toDialDoc.expiry).getTime() < Date.now() || (toDial.blocked && toDial.blocked.includes(fromNumber.id))) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toCall = toDial.id;
	}

	// Change to not found or change to found!
	if (!toDial) {
		let embed = { color: config.colors.info, title: "No number available", description: "It seems like you'll have to wait. All active numbers are in a call." };
		return omsg.edit({ embed: embed }).catch(e => {
			omsg.delete();
			msg.channel.send({ embed: embed });
		});
	}

	omsg.edit({ embed: { color: config.colors.info, title: "Found a number!", description: "Attempting to call them now..." } }).catch(e => null);
	(await reload("./Commands/Public/call.js"))(client, msg, toCall, true);
};
