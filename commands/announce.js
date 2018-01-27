const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, msg, suffix) => {
	let perms = await permCheck(client, msg.author.id);
	if (!perms.boss) return;
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
	let allNumbers = Numbers.find({});
	for (let n of allNumbers) {
		let channel = await client.api.channels(n.channel);
		if (channel.get()) {
			n.messages.post(MessageBuilder({
				content: suffix,
			}));
		}
	}
	msg.reply("✅ Your message has been successfully globally announced.");
};
