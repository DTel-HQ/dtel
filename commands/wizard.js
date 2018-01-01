const Discord = require("discord.js");
const fs = require("fs");
const d = new Date();
var numbers = JSON.parse(fs.readFileSync("../json/numbers.json", "utf8"));
let guildnumber;
let nextmonth = d.getMonth() + 1;
let year = d.getFullYear();
let realMonth = nextmonth + 1;

module.exports = async(bot, message, args) => {
	if (nextmonth == 12) {
		nextmonth = 1;
		year += 1;
	}
	if (realMonth == 13) {
		realMonth = 1;
	}
	if (realMonth == 1 || realMonth == 2 || realMonth == 3 || realMonth == 4 || realMonth == 5 || realMonth == 6 || realMonth == 7 || realMonth == 8 || realMonth == 9) {
		realMonth = 0 + realMonth;
	}
	let mynumber;
	try {
		mynumber = await Numbers.findOne({ _id: message.channel.id }).number;
	} catch (err) {
		if (err && !mynumber) {
			try {
				guildnumber = message.guild.channels.map(c => numbers.find(i => i.channel == c.id).number);
			} catch (err2) {
				if (!err2 && guildnumber) {
					message.reply(":x: Error: You already have a number in this guild.");
				} else {
					if (!message.guild) {
						message.reply(`**WARNING: You're about to register a DM number for yourself.**\n\nPlease read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`0900\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
						let collector = message.channel.createMessageCollector(newmsg => newmsg.author.id == message.author.id);
						collector.on("collect", async cmessage => {
							if (cmessage.content === "0") {
								cmessage.reply("Exiting wizard...");
								collector.stop();
								return;
							}
							if (cmessage.content.startsWith("0900")) {
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
									.replace(" ", "");
								if (number.length !== 11) {
									cmessage.reply("I don't understand. Please retype the number. Make sure the number starts with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit.");
								} else {
									numbers.push({ channel: message.channel.id, number: number, month: nextmonth, year: year });
									fs.writeFileSync("../json/numbers.json", JSON.stringify(numbers), "utf8");
									collector.stop();
									cmessage.channel.send({
										embed: {
											color: 0x007FFF,
											title: "Done!",
											description: "Here's your service information. Should you have any questions, don't hesitate to dial `*611`.",
											fields: [{
												name: "Number",
												value: number,
											},
											{
												name: "Expiration",
												value: `${year}/${realMonth}`,
											}],
											footer: {
												text: "You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3. You have finished the wizard.",
											},
										},
									});
								}
							} else {
								cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit");
							}
						});
					} else if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
						message.reply("Self-assign wizard can only be run with a member that has Manage Server permission.");
						return;
					}
					message.reply(`Please read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n+ This wizard cannot register 0800/0844 numbers. For registration on special numbers, dial *611.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`${process.env.CPREFIX}\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
					let collector = new Discord.MessageCollector(message.channel, newmsg => newmsg.author.id == message.author.id);
					collector.on("collect", async cmessage => {
						if (cmessage.content === "0") {
							cmessage.reply("Exiting wizard...");
							collector.stop();
							return;
						}
						if (cmessage.content.startsWith("0301")) {
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
								.replace(" ", "");
							if (number.length !== 11) {
								cmessage.reply("I don't understand. Please retype the number. Make sure the number starts with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit.");
							} else {
								numbers.push({ channel: message.channel.id, number: number, month: nextmonth, year: year });
								fs.writeFileSync("../json/numbers.json", JSON.stringify(numbers), "utf8");
								collector.stop();
								cmessage.channel.send({
									embed: {
										color: 0x007FFF,
										title: "Done!",
										description: "Here's your service information. Should you have any questions, don't hesitate to dial `*611`.",
										fields: [{
											name: "Number",
											value: number,
										},
										{
											name: "Expiration",
											value: `${year}/${realMonth}`,
										}],
										footer: {
											text: "You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3. You have finished the wizard.",
										},
									},
								});
							}
						} else {
							cmessage.reply("I don't understand. Please retype the number. The number **must** start with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit");
						}
					});
				}
			}
		} else {
			message.reply(":x: Error: You already have a number in this channel. If you wish to edit or remove your number, dial `*611`.");
		}
	}
};
