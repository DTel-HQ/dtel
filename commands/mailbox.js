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
							text: `Change these settings with ">mailbox settings [setting name]`,
						},
					},
				});
			} else if (args.split(" ")[1].toLowerCase() === "autoreply") {
				if (msg.channel.type != "dm" && !msg.member.hasPermission("MANAGE_GUILD")) {
				return msg.reply("You don't have `Manage Server` permission!");
			}
				let collector = msg.channel.createMessageCollector(newmsg => newmsg.author.id === msg.author.id);
				let automsg = await msg.channel.send({
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
			return msg.channel.send({
				embed: {
					color: 0x0000FF,
					title: `:mailbox_with_mail: You have ${mailbox.messages.length} messages.`,
					fields: embedFields,
					footer: {
						text: "Delete a message: `>mailbox delete [id]`.",
					},
				},
			});
		}
		case "delete": {
			let message = mailbox.messages.find(m => m._id === args.split(" ")[1]);
			if (!message) {
				return msg.channel.send({
					embed: {
						title: ":question: I can't find that",
					},
				});
			}
			let perms = await client.permCheck(msg.author.id);
			if (msg.channel.type == "text" && !msg.member.hasPermission("MANAGE_GUILD") && !perms.support) {
				return msg.reply("You don't have `Manage Server` permission!");
			} else {
				mailbox.messages.splice(mailbox.messages.indexOf(message));
				await mailbox.save();
				msg.channel.send({
					embed: {
						color: 0x00FF00,
						title: ":white_check_mark: Success!",
						description: "Successfully removed message.",
					},
				});
			}
			break;
		}
		case "clear": {
			let perms = await client.permCheck(msg.author.id);
			if (msg.channel.type == "text" && !msg.member.hasPermission("MANAGE_GUILD") && !perms.support) {
				return msg.reply("You don't have `Manage Server` permission!");
			} else {
				mailbox.messages = [];
				await mailbox.save();
				msg.channel.send({
					embed: {
						color: 0x00FF00,
						title: ":white_check_mark: Success!",
						description: "Successfully removed all message.",
					},
				});
			}
			break;
		}
		default: {
			msg.channel.send({
				embed: {
					title: ":mailbox: Mailbox",
					description: `You have **${mailbox.messages.length}** messages.\nCheck them with \`>mailbox messages\`.\nOr you can delete all your messages with \`>mailbox clear\`.`,
					fields: [{
						name: "Mailbox Autoreply",
						value: `${mailbox.settings.autoreply}`,
					}],
					footer: {
						text: `Change the settings with ">mailbox settings"`,
					},
				},
			});
		}
	}
};
