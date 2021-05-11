const randomstring = require("randomstring");

module.exports = async(client, msg, suffix) => {
	let time = Date.now();

	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: `>message [number] [message]`" } });

	let toNumber, message;
	toNumber = client.replaceNumber(suffix.split(" ")[0]);
	message = suffix.split(" ");
	message.shift();
	message = message.join(" ");

	if (!message) return msg.channel.send({ embed: { color: config.colors.error, title: "Send what now?", description: "I can't seem to find a message to send." } });
	if (message.length > 400) return msg.channel.send({ embed: { color: config.colors.error, title: "Hello J.J. Voskuil", description: "don't you think this is a bit too much to read? (keep it under 400char)" } });

	let fromNumberDoc = await r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);
	if (!fromNumberDoc) return msg.reply("This channel doesn't have a number.");
	if (new Date(fromNumberDoc.expiry).getTime() < Date.now()) return msg.channel.send({ embed: { color: config.colors.error, title: "Billing error", description: "Your number has expired. You can renew your number by dialling `*233`" } });

	toNumber = client.replaceNumber(toNumber);
	let toNumberDoc = await r.table("Numbers").get(toNumber);
	if (!toNumberDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "Couldn't find the requested number." } });

	if (fromNumberDoc.id == toNumberDoc.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Why try?", description: "You can't send a message to yourself." } });

	let account = await msg.author.account();

	if (account.balance < config.messageCost) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `You don't have enough credits (${config.messageCost}) to send a message.` } });
	account.balance -= config.messageCost;

	let mailbox = await r.table("Mailbox").get(toNumberDoc.channel);
	if (!mailbox) return msg.channel.send({ embed: { color: config.colors.error, description: "Could not send a message, ask them to set-up their mailbox first." } });

	let cooldown = await r.table("Cooldowns").get(`${msg.author.id}-message`);
	if (cooldown && cooldown.time > time && !msg.author.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Message cooldown", description: `Not so quick... you're under cooldown for another ${Math.round((cooldown.time - time) / 1000, 1)}s`, footer: { text: "Keep in mind that spamming a mailbox will result in a strike/blacklist." } } });
	else msg.author.cooldown = "message";

	const fromBlocked =  fromNumberDoc.blocked && fromNumberDoc.blocked.includes(toNumberDoc.channel);
	const toBlocked = toNumberDoc.blocked && toNumberDoc.blocked.includes(fromNumberDoc.channel);
	if (fromBlocked || toBlocked) return msg.channel.send({ embed: { color: config.colors.error, description: `Could not send a message to \`${toNumberDoc.id}\`.`} })

	await r.table("Accounts").get(msg.author.id).update({ balance: account.balance });
	let id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });
	if (mailbox.messages && mailbox.messages[0]) {
		while (mailbox.messages.find(x => x.id == id)) {
			id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });
		}
	}

	let fromNumbervip = fromNumberDoc.vip ? new Date(fromNumberDoc.vip.expiry).getTime() > Date.now() : false;
	let from;
	if (fromNumbervip && fromNumberDoc.vip.hidden) from = fromNumberDoc.vip.name || "hidden";
	else from = fromNumberDoc.id;

	let messageDoc = {
		id: id,
		number: fromNumberDoc.id,
		from: from,
		user: msg.author.id,
		message: message,
		time: time,
	};

	let messages = mailbox.messages || [];
	messages.push(messageDoc);

	await r.table("Mailbox").get(toNumberDoc.channel).update({ messages: messages });
	const fromMailbox = await r.table("Mailbox").get(fromNumberDoc.channel);
	client.apiSend({ embed: { color: config.colors.info, title: "New message!", description: `You received a message. Check it using \`>mailbox\``, footer: { text: id } } }, mailbox.id);
	const content = { embed: { color: config.colors.success, title: "Message sent!", description: `Your message succesfully reached the other side!\nContent: ${messageDoc.message}`, footer: { text: id }, author: { name: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } };
	if (!fromMailbox) content.embed.footer = { text: "You can't receive messages without a mailbox. Set one up with >mailbox" };
	msg.channel.send(content);
};
