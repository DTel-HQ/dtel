const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix, rcall) => {
	let csCall;
	rcall === true ? rcall = true : rcall = false;

	let cooldown = await r.table("Cooldowns").get(`${msg.author.id}-call`);
	if (cooldown && cooldown.time > Date.now() && !msg.author.support && !["*411", "*233"].includes(suffix)) return msg.channel.send({ embed: { color: config.colors.error, title: "Cooldown", description: `Not so quick... you're under cooldown for another ${Math.round((cooldown.time - Date.now()) / 1000, 1)}s`, footer: { text: "Keep in mind that spamming a number will result in a strike/blacklist." } } });
	else if (!["*411", "*233"].includes(suffix)) msg.author.cooldown = "call";

	let myNumber = await msg.channel.number;
	if (!myNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: `There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing \`>wizard\`. \nIf you need assistance or have any questions, call \`*611\` or join our support server: ${config.guildInvite}.` } });

	if (myNumber.waiting) return;

	let toDial = suffix;
	if (!toDial) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: "You didn't specify a number... `>call [number]`" } });

	if (new Date(myNumber.expiry).getTime() < Date.now() && !["*233", "*611"].includes(toDial)) return msg.channel.send({ embed: { color: config.colors.error, title: "Billing error", description: "Your number has expired. You can renew your number by dialling `*233`." } });

	toDial = await client.replaceNumber(toDial);

	if (toDial == myNumber.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Why would you call yourself?", description: "Try `>rcall` if you don't have anyone to call!" } });
	if (config.aliasNumbers[toDial]) {
		toDial = config.aliasNumbers[toDial];
	}
	if (toDial == "08007877678")	csCall = true;
	if (toDial == "08007877678" && msg.guild && msg.guild.id === config.supportGuild) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Dialing error", description: "You are unable to call *611 here because Customer Support is literally at your doorstep." } });
	}

	if (toDial == "*411") return (await reload("./Internals/411.js"))(msg, myNumber);
	if (toDial == "*233") return (await reload("./Internals/233.js"))(msg, myNumber);

	let toDialDoc = await r.table("Numbers")
		.get(toDial)
		.default(null);

	if (!toDialDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Dialing error", description: `The requested number (${toDial.replace("*", "")}) does not exist. Call \`*411\` to check numbers.${rcall ? " Please call *611 so we can remove this number from the phonebook." : ""}` } });
	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		msg.channel.send({ embed: { color: config.colors.error, title: "Dialing error", description: `Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server.${rcall ? "\nSending you back..." : ""}` } });
		client.delete(toDialDoc.id);
		if (rcall) return (await reload("./Commands/Public/rcall.js"))(client, msg);
		else return;
	}
	if (myNumber.blocked && myNumber.blocked.includes(toDialDoc.id)) return msg.channel.send({ embed: { color: config.colors.error, title: "Dialing error", description: "You have blocked this number." } });
	if (toDialDoc.blocked && toDialDoc.blocked.includes(myNumber.id)) return msg.channel.send({ embed: { color: config.colors.error, title: "Dialing error", description: "That number can't be reached." } });
	if (new Date(toDialDoc.expiry).getTime() < Date.now() && myNumber.id != config.aliasNumbers["*611"]) return msg.channel.send({ embed: { color: config.colors.error, title: "Billing error", description: "The number you are trying to reach has expired. Please contact the owner to renew it." } });

	let activeCall = await r.table("Calls").getAll(toDial, { index: "fromChannel" }).nth(0).default(null);
	if (!activeCall) activeCall = await r.table("Calls").getAll(toDial, { index: "toChannel" }).nth(0).default(null);
	// This could be turned into a module for hangup support.
	if (activeCall) {
		// Max time must be full minutes.
		let waitingRetry = 15000;
		let maxTime = 5 * 60000;

		// send embed
		let omsg = await msg.channel.send({ embed: {
			color: config.colors.error,
			title: "Number is already in a call",
			description: `Would you like to wait ${Math.round(maxTime / 60000)} minutes until the number is available?\nYou won't be able to hangup.\nRespond with \`yes\` or \`no\``,
			footer: {
				text: "This call will automatically be hung up after 60 seconds of inactivity",
			},
		} });

		// create collector
		let collected = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && /^yes$|^no$/i.test(m.content),
			{ max: 1, time: 60000 }
		);

		// on collected
		omsg.delete().catch(e => null);
		if (!collected.first()) return;
		collected.first().delete().catch(e => null);
		if (/^no$/i.test(collected.first().content)) return;

		await r.table("Numbers").get(myNumber.id).update({ waiting: true });
		omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Waiting...", description: "Checking the availability periodically. Please wait for an update." } });

		// Wait x amount of minutes to see if number turns available.
		// eslint-disable-next-line no-constant-condition
		let wait = await new Promise((resolve, reject) => {
			let retry = 0;
			let i = setInterval(async() => {
				retry++;
				activeCall = await r.table("Calls").getAll(toDial, { index: "fromChannel" }).nth(0).default(null);
				if (!activeCall) activeCall = await r.table("Calls").getAll(toDial, { index: "toChannel" }).nth(0).default(null);
				if (!activeCall) {
					await r.table("Numbers").get(myNumber.id).update({ waiting: false });
					clearInterval(i);
					resolve();
				} else if (retry >= Math.round(maxTime / waitingRetry)) {
					clearInterval(i);
					omsg.delete().catch(e => null);
					await r.table("Numbers").get(myNumber.id).update({ waiting: false });
					return msg.channel.send({ embed: { color: config.colors.error, title: "Waiting expired", description: "The waiting time has expired and the line is still being used." } });
				}
			}, waitingRetry);
		});

		omsg.delete().catch(e => null);
	}

	if (csCall) {
		// send confirmation embed
		let omsg = await msg.channel.send({ embed: {
			color: config.colors.info,
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
		if (!collected.first()) return;
		collected.first().delete().catch(e => null);
		if (/^no$/i.test(collected.first().content)) return;

		// Inform CS
		await client.apiSend(`<@&${config.supportRole}>`, toDialDoc.channel);
	}

	let myNumbervip = myNumber.vip ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;
	let toDialvip = toDialDoc.vip ? new Date(toDialDoc.vip.expiry).getTime() > Date.now() : false;

	let callDoc = {
		id: uuidv4(),
		to: {
			number: toDialDoc.id,
			channel: toDialDoc.channel,
			vip: toDialvip,
			hidden: toDialvip ? toDialDoc.vip.hidden : false,
			name: toDialvip ? toDialDoc.vip.name : false,
		},
		from: {
			number: myNumber.id,
			channel: myNumber.channel,
			vip: myNumbervip,
			hidden: myNumbervip ? myNumber.vip.hidden : false,
			name: myNumbervip ? myNumber.vip.name : false,
		},
		startedAt: new Date(),
		startedBy: msg.author.id,
		rcall: !!rcall,
	};
	await r.table("Calls").insert(callDoc);

	// To send contact name instead of number
	let contact = toDialDoc.contacts ? (await toDialDoc.contacts.filter(c => c.number === myNumber.id))[0] : null;

	// This one-lining should honestly stop.
	msg.channel.send({ embed: { color: config.colors.info, title: `Dialing \`${toDial}\``, description: `${csCall ? "" : `You can hang up using \`>hangup\`${rcall ? ", but give people the time to pick up or you may be striked." : ""}`}`, footer: { text: callDoc.id } } });
	client.log(`:telephone: ${rcall ? "rcall" : "Call"} \`${myNumbervip && myNumber.vip.hidden ? "hidden" : myNumber.channel} → ${toDialvip && toDialDoc.vip.hidden ? "hidden" : toDialDoc.channel}\` has been established by ${myNumbervip && myNumber.vip.hidden ? "Anonymous#0000" : msg.author.tag} (${myNumbervip && myNumber.vip.hidden ? "hidden" : msg.author.id}). ${callDoc.id}`);
	client.apiSend({ content: toDialDoc.mentions ? toDialDoc.mentions.join(" ") : "", embed: { color: callDoc.from.vip ? config.colors.vip : config.colors.info, title: "Incoming call", description: `There is an incoming call from ${myNumber.id === config.supportNumber ? "Customer Support" : myNumbervip ? myNumber.vip.hidden ? myNumber.vip.name ? `\`${myNumber.vip.name}\`` : "hidden" : myNumber.vip.name ? `\`${myNumber.vip.name} (${myNumber.id})\`` : contact ? `:green_book:${contact.name}` : `\`${myNumber.id}\`` : contact ? `:green_book:${contact.name}` : `\`${myNumber.id}\``}. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, footer: { text: callDoc.id } } }, toDialDoc.channel);

	// But what if they don't pick up? :thinking:
	setTimeout(async() => {
		// Has to be done with ID due to transfers within 2 min.
		let newCallDoc = await r.table("Calls").get(callDoc.id);
		if (!newCallDoc) newCallDoc = await r.table("Calls").get(callDoc.id);
		if (!newCallDoc || newCallDoc.pickedUp) return;

		client.apiSend({ embed: { color: config.colors.error, title: "Call expired", description: "You missed the call. (2 minutes)" }, footer: { text: callDoc.id } }, callDoc.to.channel);
		client.log(`:negative_squared_cross_mark: ${rcall ? "rcall" : "Call"} \`${myNumbervip ? myNumber.vip.hidden ? "hidden" : callDoc.from.channel : callDoc.from.channel} → ${toDialvip ? toDialDoc.vip.hidden ? "hidden" : callDoc.to.channel : callDoc.to.channel}\` was not picked up. ${callDoc.id}`);
		await r.table("Calls").get(callDoc.id).delete();
		await r.table("OldCalls").insert(callDoc);

		let mailbox = await r.table("Mailbox").get(toDialDoc.channel);
		if (!mailbox) return msg.channel.send({ embed: { color: config.colors.error, title: "Call expired", description: "The other side did not pick up. (2 minutes)", footer: { text: callDoc.id } } });
		else return msg.channel.send({ embed: { color: config.colors.error, footer: { text: callDoc.id }, title: "Call expired", description: "The other side did not pick up. (2 minutes)", fields: [{ name: "Mailbox", value: `${mailbox.autoreply}\n\nYou can send a message (cost: ¥${config.messageCost}) with \`>message ${toDial} [message]\`` }] } });
	}, 120000);
};
