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
			} else if (mailbox.settings.(args.split("")[1])) {

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
			}
		}
	}
};
