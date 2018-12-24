// REWRITTEN
module.exports = async(client, message, args) => {
	let mynumber, guildnumber;
	try {
		mynumber = await Numbers.findOne({ _id: message.channel.id });
	} catch (err) {
		// Ignore
	}
	if (mynumber) {
		return message.reply(":x: Error: You already have a number in this channel. If you wish to edit or remove your number, dial `*611`.");
	}
	if (!message.channel.type === "dm") {
		for (const c of message.guild.channels.values()) {
			try {
				guildnumber = await Numbers.findOne({ _id: c.id });
				if (guildnumber) break;
			} catch (_) {
				// Ignore
			}
		}
	}
	if (guildnumber) {
		return message.reply(":x: Error: You already have a number in this guild. If you wish to edit, remove your number or add another number, dial `*611`.");
	} else if (!message.guild) {
		message.channel.send({embed: {
			color: 0x007FFF,
			title: "Before proceeding, please read the following information.",
			fields: [
				{name: "This is a roleplay bot!",
				 value: "In case you haven't noticed, this bot is a roleplay bot used to simulate a telephone system between Discord servers, which means it **cannot call real numbers!!!**"
				},
				{name: "Documentation",
				 value: "The documentation is located at https://discordtel.austinhuang.me. **Please read it** as it contains important information regarding the use of this bot."
				},
				{name: "Payment",
				 value: "**Your number must be renewed for every month of usage.** The number will cost **500** in-bot credits per month, after 1 month of free period. You must type `>dial *233` to renew it. See [here](https://discordtel.austinhuang.me/en/latest/Payment/) for ways to get credits. **No real-money purchase is required to use this bot and renew your number.**"
				},
				{name: "You're registering a number in DM!",
				 value: "...which means all calls to the number will show up as direct messages. Just to let you know."
				},
				{name: "I'm ready!",
				 value: `Please enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`030${prefix}\` followed by another 7 digits. Type \`0\` to quit the wizard.`
				}
			]
		}});	} else if (!message.member.hasPermission("MANAGE_GUILD")) {
		return message.reply("Self-assign wizard can only be run with a member that has Manage Server permission.");
	} else {
		let prefix = (client.shard.id + 1).toString();
		message.channel.send({embed: {
			color: 0x007FFF,
			title: "Before proceeding, please read the following information.",
			fields: [
				{name: "This is a roleplay bot!",
				 value: "In case you haven't noticed, this bot is a roleplay bot used to simulate a telephone system between Discord servers, which means it **cannot call real numbers!!!**"
				},
				{name: "Documentation",
				 value: "The documentation is located at https://discordtel.austinhuang.me. **Please read it** as it contains important information regarding the use of this bot."
				},
				{name: "Payment",
				 value: "**Your number must be renewed for every month of usage.** The number will cost **500** in-bot credits per month, after 1 month of free period. You must type `>dial *233` to renew it. See [here](https://discordtel.austinhuang.me/en/latest/Payment/) for ways to get credits. **No real-money purchase is required to use this bot and renew your number.**"
				},
				{name: "I'm ready!",
				 value: `Please enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`030${prefix}\` followed by another 7 digits. Type \`0\` to quit the wizard.`
				}
			]
		}});
	}

	let collector = message.channel.createMessageCollector(newmsg => newmsg.author.id == message.author.id);
	collector.on("collect", async cmessage => {
		cmessage.content = cmessage.content.toLowerCase();
		let number = cmessage.content.replace(/(a|b|c)/ig, "2")
				.replace(/(d|e|f)/ig, "3")
				.replace(/(g|h|i)/ig, "4")
				.replace(/(j|k|l)/ig, "5")
				.replace(/(m|n|o)/ig, "6")
				.replace(/(p|q|r|s)/ig, "7")
				.replace(/(t|u|v)/ig, "8")
				.replace(/(w|x|y|z)/ig, "9")
				.replace(/-/ig, "")
				.replace("(", "")
				.replace(")", "")
				.replace(/\s+/g, "")
				.replace(/[^\d]+/g, ""),
			prefix = (client.shard.id + 1).toString();
		if (number === "0") {
			cmessage.reply("Exiting wizard...");
			return collector.stop();
		}
		if (!parseInt(number)) return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit");
		if (cmessage.channel.type === "dm") {
			if (!number.startsWith("0900")) {
				return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit");
			}
			if (number.length !== 11) {
				return cmessage.reply("I don't understand. Please retype the number. Make sure the number starts with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			}
		} else if (!number.startsWith(`030${prefix}`)) {
			return cmessage.reply(`I don't understand. Please retype the number. The number **must** start with \`030${prefix}\` followed by 7 digits (11 digits altogether). Type \`0\` to quit.`);
		} else if (number.length !== 11) {
			return cmessage.reply(`I don't understand. Please retype the number. The number **must** start with \`030${prefix}\` followed by 7 digits (11 digits altogether). Type \`0\` to quit.`);
		}
		let exists;
		try {
			exists = await Numbers.findOne({ number: number });
			if (exists) throw new Error();
		} catch (err) {
			return cmessage.reply("This number is already registered. Please enter another number.");
		}
		const expiryDate = new Date();
		expiryDate.setMonth(expiryDate.getMonth() + 1);
		let numberDocument = await Numbers.create(new Numbers({ _id: message.channel.id, number: number, expiry: expiryDate }));
		await collector.stop();
		client.apiSend(`:blue_book: Number \`${numberDocument.number}\` is self-assigned to channel ${numberDocument._id} by ${message.author.tag}.`, process.env.LOGSCHANNEL);
		cmessage.reply("You can also set a description for your number in the Phonebook (`>dial *411`), which will enable your number to be randomly called by others (`>rdial`). If you want to set one, enter a description for your number, otherwise type `skip`.");
		let collector2 = message.channel.createMessageCollector(newmsg => newmsg.author.id == message.author.id);
		collector2.on("collect", async c2msg => {
			if (c2msg.content.length > 1024) return message.reply("Phonebook description can only be maximum 1024 characters long.");
			if (c2msg.content.toLowerCase() !== "skip") {
				let pbentry;
				pbentry = await Phonebook.findOne({ _id: mynumber.number });
				pbentry = pbentry === null ? await Phonebook.create(new Phonebook({
					_id: number,
					channel: message.channel.id,
					description: "The owner has not set a description.",
				})) : pbentry;
				// eslint-disable-next-line no-useless-escape
				const censorship = c2msg.content.replace(/(\*|\`|\_|\~)/, "\\$1").replace(/@(everyone|here)/g, "@\u200b$1");
				pbentry.description = censorship;
				await pbentry.save();
				await collector2.stop();
				message.channel.send({
					embed: {
						color: 0x007FFF,
						title: "Done!",
						description: "Here's your service information. Should you have any inquiries, don't hesitate to dial `*611`.",
						fields: [{
							name: "Number",
							value: number,
							inline: true,
						},
						{
							name: "Expiration",
							value: `${expiryDate.getFullYear()}/${expiryDate.getMonth() + 1}`,
							inline: true,
						},
						{
							name: "Phonebook Description",
							value: censorship,
							inline: true,
						}],
						footer: {
							text: "You have finished the wizard.",
						},
					},
				});
			}
			else {
				await collector2.stop();
				message.channel.send({
					embed: {
						color: 0x007FFF,
						title: "Done!",
						description: "Here's your service information. Should you have any inquiries, don't hesitate to dial `*611`.",
						fields: [{
							name: "Number",
							value: number,
							inline: true,
						},
						{
							name: "Expiration",
							value: `${expiryDate.getFullYear()}/${expiryDate.getMonth() + 1}`,
							inline: true,
						},
						{
							name: "Remember...",
							value: "To receive random calls (`>rdial`s), you must register in the phonebook (*411). To do so, dial *411 and press 3. ",
						}],
						footer: {
							text: "You have finished the wizard.",
						},
					},
				});
			}
		});
	});
};
