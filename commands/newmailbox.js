module.exports = async(client, msg, args) => {
	let mailbox;
	try {
		mailbox = await Mailbox.findOne({ _id: msg.channel.id });
		if (!mailbox) throw new Error();
	} catch (err) {
		mailbox = await Mailbox.create({
			_id: msg.channel.id,
		});
	}
	switch (args.split(" ")[0]) {
		case "settings": {
			if (!args.split(" ")[1]) {
				msg.channel.send({
					embed: {
						color: 0x0000FF,
						title: ":tools: Mailbox Settings",
						description: `**Autoreply**\n\`${mailbox.settings.autoreply}\``,
						footer: {
							text: `Change these settings with ">mailbox settings [setting name] [value]`,
						},
					},
				});
			} else if (args.split(" ")[1].toLowerCase() === "autoreply") {
				let collector = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
				let automsg = msg.channel.send({
					embed: {
						color: 0x0000FF,
						title: ":tools: Mailbox Autoreply",
						description: "Please type a new autoreply.",
						footer: {
							text: "Type 0 to exit",
						},
					},
				});
				collector.on("collect", async cmsg => {
					if (cmsg.content === "0") {
						automsg.edit({
							embed: {
								color: 0xFF0000,
								description: "Exiting Settings",
							},
						});
						await collector.stop();
					} else {
						mailbox.settings.autoreply = cmsg.content;
						await mailbox.save();
						await collector.stop();
						automsg.edit({
							embed: {
								color: 0x00FF00,
								title: ":white_check_mark: Success!",
								description: "Successfully updated autoreply.",
							},
						});
					}
				});
			}
			break;
		}
		case "messages": {
			if (!mailbox.messages) {
				return msg.channel.send({
					embed: {
						color: 0x00FF00,
						title: ":mailbox_with_no_mail: No messages!",
					},
				});
			}
			let embedFields = [];
			for (let m of mailbox.messages) {
				embedFields.push({
					name: `ID: "${m._id}" from ${m.from}`,
					value: m.content,
				});
			}
			if (!args.split(" ")[1]) {
				return msg.channel.send({
					embed: {
						color: 0x0000FF,
						title: `:mailbox_with_mail: You have ${mailbox.messages.length} messages.`,
						fields: embedFields,
						footer: {
							text: "Message options: `>mailbox messages [id]`",
						},
					},
				});
			} else {
				let message = mailbox.messages.find(m => m.id === args.split("")[2]);
				if (!message) {
					return message.reply({
						embed: {
							title: ":question: I can't find that",
						},
					});
				} else {
					switch (args.split(" ")[2]) {
						case "delete": {
							if (!msg.member.hasPermission("MANAGE_GUILD")) {
								return msg.reply("You don't have `Manage Server` permission!");
							} else {
								mailbox.messages.splice(mailbox.messages.indexOf(message));
								await mailbox.save();
								msg.reply({
									embed: {
										color: 0x00FF00,
										title: ":white_check_mark: Success!",
										description: "Successfully removed message.",
									},
								});
								break;
							}
						}
						case "callback": {
							msg.channel.send(`>call ${message.from}`);
							break;
						}
						default: {
							msg.channel.send({
								embed: {
									title: ":question: What would you like to do?",
									description: "`delete` Delete the message\n`callback` Call the caller back",
									footer: {
										text: `>mailbox messages ${args.split(" ")[1]} <Option>`,
									},
								},
							});
						}
					}
				}
			}
			break;
		}
		default: {
			msg.channel.send({ embed: { title: ":mailbox: Mailbox", description: `${mailbox.messages.length ? `**\`${mailbox.messages.length}\` Messages**\n*View them with \`>mailbox messages\`*\n\n` : ""}**Mailbox Settings**\n${Object.keys(mailbox.settings).map((a, b) => `${a} \`${mailbox.settings[a]}\`\n*Change the settings with \`>mailbox settings\`*`)}` } });
		}
	}
};
