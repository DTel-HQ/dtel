const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix, rcall) => {
	let csCall;

	let myNumber = await r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);

	if (!myNumber) return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
	if (new Date(myNumber.expiry).getTime() < Date.now()) return msg.reply(":x: Billing error: Your number has expired. You can renew your number by dialling `*233`.");

	let toDial = suffix;
	if (!toDial) return msg.reply("Please specify a number to call");

	toDial = await client.replaceNumber(toDial);

	if (toDial == myNumber.id) return msg.reply(":thinking: Why are you trying to call yourself?");
	if (config.aliasNumbers[toDial]) {
		toDial = config.aliasNumbers[toDial];
	}
	if (toDial == "08006113835")	csCall = true;
	if (toDial == "08006113835" && msg.guild && msg.guild.id === config.supportGuild) {
		return msg.reply(":x: You are unable to call *611 here because Customer Support is literally at your doorstep.");
	}

	if (toDial == "*411") return require("../../Internals/411.js")();
	if (toDial == "*233") return require("../../Internals/233.js")(msg, myNumber);

	let toDialDoc = await r.table("Numbers")
		.get(toDial)
		.default(null);

	if (!toDialDoc) return msg.reply(`:x: Dialing error: Requested number (${toDial}) does not exist. Call \`*411\` to check numbers.${rcall ? " Please call *611 so we can remove this number from the phonebook." : ""}`);
	if (new Date(toDialDoc.expiresAt).getTime() < Date.now()) return msg.reply(":x: Dialing error: The number you have dialled has expired. Please contact the number owner to renew it.");
	if (toDialDoc.blocked && toDialDoc.blocked.includes(myNumber.id)) return msg.reply(":no_entry_sign: That number can't be reached.");

	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		msg.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
		await r.table("Numbers").get(toDial).delete();
	}

	let activeCall = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);
	if (activeCall) return msg.reply(":x: Dialing error: The number you dialed is already in a call.");

	if (csCall) {
		await client.apiSend(`<@&${config.supportRole}>`, toDialDoc.channel);
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
	client.log(`:telephone: A ${rcall ? "random call" : "call"} has been established between channel ${msg.channel.id} and channel ${toDialDoc.channel} by **${msg.author.tag}** (${msg.author.id}).`);
	client.apiSend(`There is an incoming call from \`${myNumber.id}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDoc.channel);

	// But what if they don't pick up? :thinking:
	setTimeout(async() => {
		callDoc = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);
		if (!callDoc || callDoc.pickedUp) return;

		client.apiSend(":x: You missed the call (2 minutes).", callDoc.to.channel);
		await Calls.newGet(callDoc.id).delete();

		client.log(`:telephone: The ${rcall ? "random call" : "call"} between channel ${callDoc.from.channel} and channel ${callDoc.to.channel} was not picked up.`);

		await r.table("OldCalls").insert(callDoc);

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
