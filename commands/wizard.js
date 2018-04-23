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
		message.reply(`**WARNING: You're about to register a DM number for yourself.**\n\nPlease read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`0900\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
	} else if (!message.member.hasPermission("MANAGE_GUILD")) {
		return message.reply("Self-assign wizard can only be run with a member that has Manage Server permission.");
	} else {
		let prefix = (client.shard.id + 1).toString();
		message.reply(`Please read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n+ This wizard cannot register 0800/0844 numbers. For registration on special numbers, dial *611.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`030${prefix}\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
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
			.replace(/\s+/g, ""),
		    prefix = (client.shard.id + 1).toString();
		if (number === "0") {
			cmessage.reply("Exiting wizard...");
			return collector.stop();
		}
		if (!parseInt(number)) return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit");
		if (message.channel.type === "dm") {
			if (!number.startsWith("0900")) {
				return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit");
			}
			if (number.length !== 11) {
				return cmessage.reply("I don't understand. Please retype the number. Make sure the number starts with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			}
		} else if (!number.startsWith("030"+prefix)) {
			return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `030"+prefix+"` followed by 7 digits (11 digits altogether). Type `0` to quit.");
		} else if (number.length !== 11) {
			return cmessage.reply("I don't understand. Please retype the number. The number **must** start with `030"+prefix+"` followed by 7 digits (11 digits altogether). Type `0` to quit.");
		}
		let exists;
		try {
			exists = await Numbers.findOne({ number: number });
			if (exists) throw new Error();
		} catch (err) {
			return message.reply("This number is already registered. Please enter another number.");
		}
		const expiryDate = new Date();
		expiryDate.setMonth(expiryDate.getMonth() + 1);
		let numberDocument = await Numbers.create(new Numbers({ _id: message.channel.id, number: number, expiry: expiryDate }));
		await collector.stop();
		message.channel.send({
			embed: {
				color: 0x007FFF,
				title: "Done!",
				description: "Here's your service information. Should you have any inquiries, don't hesitate to dial `*611`.",
				fields: [{
					name: "Number",
					value: number,
				},
				{
					name: "Expiration",
					value: `${expiryDate.getFullYear()}/${expiryDate.getMonth() + 1}`,
				}],
				footer: {
					text: "You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3. You have finished the wizard.",
				},
			},
		});
	});
};
