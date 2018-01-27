const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, msg, suffix) => {
	let perms = permCheck(client, msg.author.id);
	if (!perms.boss) return;
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
	for (let n of await Numbers.find({})) {
		let channel = await client.api.channels(n.channel);
		if (channel.get()) {
			n.messages.post(MessageBuilder({
				content: suffix,
			}));
		}
	}
	msg.reply("✅ Your message has been successfully globally announced.");
};
