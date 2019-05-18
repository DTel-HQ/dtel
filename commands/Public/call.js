const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix, rcall) => {
	let csCall;

	let myNumber = await r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);

	let toDial = suffix;
	if (!toDial) return msg.reply("Please specify a number to call");

	toDial = await client.replaceNumber(toDial);

	if (!myNumber) return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
	if (new Date(myNumber.expiry).getTime() < Date.now() && !["*233", "*611"].includes(toDial)) return msg.reply(":x: Billing error: Your number has expired. You can renew your number by dialling `*233`.");

	if (toDial == myNumber.id) return msg.reply(":thinking: Why are you trying to call yourself?");
	if (config.aliasNumbers[toDial]) {
		toDial = config.aliasNumbers[toDial];
	}
	if (toDial == "08006113835")	csCall = true;
	if (toDial == "08006113835" && msg.guild && msg.guild.id === config.supportGuild) {
		return msg.reply(":x: You are unable to call *611 here because Customer Support is literally at your doorstep.");
	}

	if (toDial == "*411") return require("../../Internals/411.js")(msg, myNumber);
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
		await r.table("Numbers").get(toDial).delete();
		return msg.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
	}

	let activeCall = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);
	if (activeCall) return msg.reply(":x: Dialing error: The number you dialed is already in a call.");

	if (csCall) {
		// send confirmation embed
		let omsg = await msg.channel.send("", { embed: {
			color: 0x3498DB,
			title: "Please read before calling",
			description: "*611 is our Customer Support number operated by real people.\nTherefore any misuse of the service (eg. trolling) will result in a strike/blacklist.\nAre you sure you want to call *611?\n\nRespond with `yes` or `no`.",
			footer: {
				text: "This call will automatically be discarded in 60 seconds",
			},
		} });

		// Make a collector for yes/no
		let collected = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && /^yes$|^no$/i.test(m.content),
			{ max: 1, time: 60000 }
		);

		// on collection
		omsg.delete();
		if (msg.guid) collected.first().delete();
		if (!collected.first() || /no/i.test(collected.first().content)) return;

		// Inform CS
		await client.apiSend(`<@&${config.supportRole}>`, toDialDoc.channel);
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

	msg.reply(`:telephone: Dialling ${toDial}... ${csCall ? "" : "You can hang up using `>hangup`, but give people the time to pick up or you may be striked."}`);
	client.log(`:telephone: ${rcall ? "Rcall" : "Call"} \`${myNumber.channel} → ${toDialDoc.channel}\` has been established by ${msg.author.tag} (${msg.author.id}).`);
	client.apiSend(`${toDialDoc.mentions ? `${toDialDoc.mentions.join(" ")}\n` : ""}There is an incoming call from \`${myNumber.id}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDoc.channel);

	callDoc = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);

	// But what if they don't pick up? :thinking:
	setTimeout(async() => {
		// Has to be done with ID due to transfers within 2 min.
		callDoc = await Calls.get(callDoc.id);
		if (!callDoc || callDoc.pickedUp) return;

		client.apiSend(":x: You missed the call (2 minutes).", callDoc.to.channel);
		await Calls.newGet(callDoc.id).delete();

		client.log(`:telephone: ${rcall ? "Rcall" : "Call"} \`${callDoc.from.channel} → ${callDoc.to.channel}\` was not picked up.`);

		await r.table("OldCalls").insert(callDoc);

		let mailbox = await r.table("Mailbox").get(toDialDoc.channel).default(null);
		if (!mailbox) return msg.channel.send(":x: The other side did not pick up the call.");
		msg.channel.send(`:x: The other side did not pick up the call.\nAutomated mailbox message: ${mailbox.autoreply}\n<@${msg.author.id}>, you can send a message (cost: ¥${config.messageCost}) with \`>message ${toDial} your message here\``);
	}, 120000);
};
