const MessageBuilder = require("../modules/MessageBuilder.js");
const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix) => {
	async function findNumber() {
		let phonebookAll, preDial, toDial, toDialDocument, dialedInCall;
		phonebookAll = await Phonebook.find({});
		preDial = phonebookAll[Math.floor(Math.random() * phonebookAll.length)];
		if (!preDial) throw new Error();
		toDial = preDial._id;
		toDialDocument = await Numbers.findOne({ number: toDial.trim(), expired: false });
		if (toDialDocument && !client.api.channels(toDialDocument._id).get()) await preDial.remove();
		if (!toDialDocument || toDial === "08006113835" || toDialDocument._id === msg.channel.id || !client.api.channels(toDialDocument._id).get()) {
			return findNumber();
		} else if (!client.api.channels(toDialDocument._id).get()) {
			await preDial.remove();
			return findNumber();
		}
		dialedInCall = await Calls.findOne({ "to.channelID": toDialDocument._id });
		if (dialedInCall) return findNumber();
		return toDialDocument;
	}
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
	if (mynumber.expired) {
		return msg.reply(":x: Billing error: Your number has expired. You can renew your number by dialling `*233`.");
	}
	try {
		findNumber().then(async toDialDocument => {
			let callDocument = Calls.create(
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
			client.apiSend(`:telephone: A random call is established between channel ${msg.channel.id} and channel ${toDialDocument._id} by __${msg.author.tag}__ (${msg.author.id}).`, process.env.LOGSCHANNEL);
			msg.reply(`:telephone: Dialing \`${toDialDocument.number}\`...  You are able to \`>hangup\`.`);
			client.apiSend(`There is an incoming call from \`${mynumber.number}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDocument._id);
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
		});
	} catch (err) {
		return msg.reply("Could not find a number to call.");
	}
};
