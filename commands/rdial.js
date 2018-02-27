const MessageBuilder = require("../modules/MessageBuilder.js");
const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix) => {
	let mynumber;
	try {
		mynumber = await Numbers.findOne({ _id: msg.channel.id });
		if (!mynumber) throw new Error();
	} catch (err) {
		if (msg.channel.type === "dm") return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
		let activeChannel, numberError;
		for (const c of msg.guild.channels.values()) {
			try {
				activeChannel = await Numbers.findOne({ _id: c.id });
				if (!activeChannel) throw new Error();
			} catch (err2) {
				numberError = err2;
			}
		}
		if (!numberError && activeChannel && suffix !== "*233" && suffix !== "*411") {
			return msg.reply(`:x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service, such as <#${activeChannel._id}>.`);
		} else if (!mynumber) {
			return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
		} else {
			return msg.reply(":x: Unknown Error!");
		}
	}
	if (!mynumber) {
		return msg.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service. Create a number in any channel by typing `>wizard`. \nIf you need assistance or have any questions, call `*611`.");
	}
	let phonebookAll, preDial, toDial;
	try {
		phonebookAll = await Phonebook.find({});
		preDial = phonebookAll.entries[Math.floor(Math.random() * phonebookAll.length)];
		if (!preDial) throw new Error();
		toDial = preDial.number;
	} catch (err) {
		return msg.reply("Could not find a number to call.");
	}
	let toDialDocument;
	try {
		toDialDocument = await Numbers.findOne({ number: toDial.trim() });
		// Comment from Vlad: China™ fix right here
		if (!toDialDocument) throw new Error();
	} catch (err) {
		return msg.reply(":x: Dialing error: Requested number does not exist. Call `*411` to check numbers.");
	}
	if (toDialDocument.expired) {
		return msg.reply(":x: Dialing error: The number you have dialled has expired. Please contact the number owner to renew it.");
	}
	if (mynumber.expired) {
		return msg.reply(":x: Billing error: Your number has expired. You can renew your number by dialling `*233`.");
	}
	if (toDialDocument && !client.api.channels(toDialDocument._id).get()) {
		return msg.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
	}
	let dialedInCall;
	try {
		dialedInCall = await Calls.findOne({ "to.channelID": toDialDocument._id });
		if (!dialedInCall) throw new Error();
	} catch (err) {
		try {
			dialedInCall = await Calls.findOne({ "from.channelID": toDialDocument._id });
			if (!dialedInCall) throw new Error();
		} catch (err2) {
			// Ignore
		}
	}
	if (dialedInCall) {
		return msg.reply(":x: Dialing error: The number you dialed is already in a call.");
	}
	if (toDial === "08006113835") {
		let guild = client.guilds.get(process.env.SUPPORTGUILD);
		if (guild) {
			let customerSupport = guild.roles.get(process.env.SUPPORTROLE);
			customerSupport.setMentionable(true);
			await client.channels.get(toDialDocument._id).send(client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).toString());
			customerSupport.setMentionable(false);
		} else {
			// Everything past this is Vlad's fault. Blame him if it borks
			try {
				await client.api.guilds(process.env.SUPPORTGUILD).roles(process.env.SUPPORTROLE).patch({
					data: {
						mentionable: true,
					},
				});
				await client.apiSend(`<@&${process.env.SUPPORTROLE}>`, toDialDocument._id);
				await client.api.guilds(process.env.SUPPORTGUILD).roles(process.env.SUPPORTROLE).patch({
					data: {
						mentionable: false,
					},
				});
			} catch (err) {
				// Ignore
			}
		}
	}
	let callDocument = await Calls.create(
		new Calls({
			_id: uuidv4(),
			to: {
				channelID: toDialDocument._id,
				number: toDialDocument.number,
				guild: toDialDocument.guild,
			},
			from: {
				channelID: msg.channel.id,
				number: mynumber.number,
				guild: msg.guild.id,
			},
		})
	);
	await client.apiSend(`There is an incoming call from \`${mynumber.number}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDocument._id);
	setTimeout(async() => {
		callDocument = await Calls.findOne({ _id: callDocument._id });
		if (callDocument.pickedUp) return;
		callDocument.status = false;
		await callDocument.save();
		msg.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
		client.channels.get(callDocument.to.channelID).send(":x: This call has expired (2 minutes).");
		client.channels.get(process.env.LOGSCHANNEL).send(`:telephone: The call between channel ${callDocument.from.channelID} and channel ${callDocument.to.channelID} has expired.`);
		let mailbox;
		try {
			mailbox = await Mailbox.findOne({ _id: toDialDocument._id });
			if (!mailbox) throw new Error();
		} catch (err) {
			return client.channels.get(callDocument.from.channelID).send(":x: Call ended; their mailbox isn't setup");
		}
		client.channels.get(callDocument.from.channelID).send(`:x: ${mailbox.settings.autoreply}`);
		client.channels.get(callDocument.from.channelID).send(":question: Would you like to leave a message? `>message [number] [message]`");
		await OldCalls.create(new OldCalls(callDocument));
		await callDocument.remove();
	}, 120000);
};
