const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix) => {
	let csCall;

	let myNumber = await r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);

	if (!myNumber) return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
	if (new Date(myNumber.expiry).getTime() < Date.now()) return msg.reply(":x: Billing error: Your number has expired. You can renew your number by dialling `*233`.");

	let toDial = suffix;
	if (!toDial) return msg.reply("Please specify a number to call");

	toDial = client.replaceNumber(toDial);

	if (toDial == myNumber.id) return msg.reply(":thinking: Why are you trying to call yourself?");
	if (config.aliasNumbers.includes(toDial)) {
		if (toDial == "*611" && msg.guild && msg.guild.id === process.env.SUPPORTGUILD) {
			csCall = true;
			return msg.reply(":x: You are unable to call *611 here because Customer Support is literally at your doorstep.");
		}
		toDial = config.aliasNumbers.find(n => n.id == toDial);
	}

	if (toDial == "*411") return require("../../Internals/411.js")();
	if (toDial == "*233") return require("../../Internals/233.js")(msg, myNumber);

	let toDialDoc = await r.table("Numbers")
		.get(toDial)
		.default(null);

	if (!toDialDoc) return msg.reply(":x: Dialing error: Requested number does not exist. Call `*411` to check numbers.");
	if (new Date(toDialDoc.expiresAt).getTime() < Date.now()) return msg.reply(":x: Dialing error: The number you have dialled has expired. Please contact the number owner to renew it.");

	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		msg.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
		await r.table("Numbers").get(toDial).delete();
	}

	let activeCall = Calls.find(c => c.to.number === toDial || c.from.number === toDial);
	if (activeCall) return msg.reply(":x: Dialing error: The number you dialed is already in a call.");

	if (csCall) {
		await client.apiSend(`<@&${process.env.SUPPORTROLE}>`, toDialDoc._id);
		msg.channel.send("Please wait out the call to give Customer Support agents time to respond, otherwise you could be punished.");
	}

	let callDoc = await Calls.create({
		id: uuidv4(),
		to: {
			number: toDialDoc.id,
			channel: toDialDoc.channel,
		},
		from: {
			number: myNumber.id,
			channel: myNumber.channel,
		},
		startedAt: new Date(),
	});

	msg.reply(`:telephone: Dialling ${toDial}... ${csCall ? "" : "You can hang up using `>hangup`"}`);
	await client.apiSend(`:telephone: A call has been established between channel ${msg.channel.id} and channel ${toDialDoc.id} by __${msg.author.tag}__ (${msg.author.id}).`, config.logsChannel);
	client.apiSend(`There is an incoming call from \`${myNumber.id}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDoc.channel);

	// But what if they don't pick up? :thinking:
	setTimeout(async() => {
		callDoc = Calls.get(callDoc.id);
		if (!callDoc || callDoc.pickedUp) return;

		msg.reply(":negative_squared_cross_mark: Nobody was there to answer your call. (2 minutes).");
		client.apiSend(":x: You missed the call (2 minutes).", callDoc.to.channel);
		callDoc.remove();

		client.apiSend(`:telephone: The call between channel ${callDoc.from.channel} and channel ${callDoc.to.channel} was not picked up.`, config.logsChannel);

		r.table("OldCalls").create(callDoc);

		let mailbox = await r.table("Mailbox").get(toDialDoc.id).default(null);
		if (!mailbox) return msg.channel.send(":x: The other side did not pick up the call.");
		msg.channel.send(`:x: The other side did not pick up the call. Automated mailbox message:\n${mailbox.autoReply}\n<@${msg.author.id}>, Type your message or enter \`no\` to exit without sending a message.`);

		let collector = msg.channel.createMessageCollector(nmsg => nmsg.author.id === msg.author.id);
		collector.on("collect", async cmsg => {
			await collector.stop();
			mailbox.messages.push(cmsg.content);
			r.table("Mailbox").get(toDialDoc.id).update({ messages: mailbox.messages });
			msg.channel.send(":mailbox: Message sent!");
		});
	}, 120000);
};
