const fs = require("fs");
var mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json", "utf8"));

exports.run = (bot, msg, args) => {
	var mailbox = mailbox_storage.find(a => a.channel === msg.channel.id);
	if (!mailbox) {
		mailbox = {
			channel: msg.channel.id,
			settings: {
				autoreply: "Sorry I am unavailable, leave a message",
			},
			messages: [],
		};
		mailbox_storage.push(mailbox);
		fs.writeFile("../jsonmailbox.json", JSON.stringify(mailbox_storage), "utf8");
	}
	switch (msg.content.split(" ")[1]) {
		case "settings":
			if (!msg.content.split(" ")[2]) {
				msg.channel.send({ embed: { title: ":tools: Mailbox Settings", description: Object.keys(mailbox.settings).map((a, b) => `${a} \`${mailbox.settings[a]}\`\n*Change the settings with \`>mailbox settings [setting name] [value]\`*`) } });
			} else if (mailbox.settings[msg.content.split(" ")[2]]) {
				if (!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) {
					msg.reply("You don't have `Manage Server` permission!");
				} else {
					mailbox.settings[msg.content.split(" ")[2]] = msg.content.replace(`>mailbox settings ${msg.content.split(" ")[2]} `, "");
					mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a => a.channel === msg.channel.id))] = mailbox;
					fs.writeFile("mailbox.json", JSON.stringify(mailbox_storage), err => {
						msg.reply(err ? err : "Saved.");
						mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json", "utf8"));
					});
				}
			}
			break;
		case "messages":
			if (!mailbox.messages) {
				msg.channel.send({ embed: { title: ":mailbox_with_no_mail: No messages!" } });
				return;
			}
			if (!msg.content.split(" ")[2]) {
				msg.channel.send({ embed: { title: `:mailbox_with_mail: You have ${mailbox.messages.length} messages.`, fields: mailbox.messages.map(m => ({ name: `ID "${m.id}" from ${m.from}`, value: m.message })), footer: { text: "Message options: `>mailbox messages [id]`" } } });
			} else {
				if (!mailbox.messages.find(a => a.id === msg.content.split(" ")[2])) {
					msg.channel.send({ embed: { title: ":question: I can't find that" } });
					return;
				}
				var message = mailbox.messages.find(a => a.id === msg.content.split(" ")[2]);
				switch (msg.content.split(" ")[3]) {
					case "delete":
						if (!msg.guild.member(msg.author).hasPermission("MANAGE_GUILD")) {
							msg.reply("You don't have `Manage Server` permission!");
						} else {
							mailbox.messages.splice(mailbox.messages.indexOf(message), 1);
							mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a => a.channel === msg.channel.id))] = mailbox;
							fs.writeFile("../json/mailbox.json", JSON.stringify(mailbox_storage), err => {
								msg.reply(err ? err : "Deleted!");
								mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json", "utf8"));
							});
						}
						break;
					case "callback":
						msg.reply(`\`>call ${msg.from}\``);
						break;
					default:
						msg.channel.send({ embed: { title: ":question: What would you like to do?", description: "`delete` Delete the message\n`callback` Call the caller back", footer: { text: `>mailbox messages ${msg.content.split(" ")[2]} <Option>` } } });
				}
			}
			break;
		default:
			msg.channel.send({ embed: { title: ":mailbox: Mailbox", description: `${mailbox.messages.length ? `**\`${mailbox.messages.length}\` Messages**\n*View them with \`>mailbox messages\`*\n\n` : ""}**Mailbox Settings**\n${Object.keys(mailbox.settings).map((a, b) => `${a} \`${mailbox.settings[a]}\`\n*Change the settings with \`>mailbox settings\`*`)}` } });
	}
};
