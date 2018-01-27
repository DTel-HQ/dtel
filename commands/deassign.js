const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, message, args) => {
	let perms = await permCheck(client, message.author.id);
	if (!perms.support) return;
	if (!args) {
		return message.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
	}
	let number;
	try {
		number = await Numbers.findOne({ _id: message.channel.id });
	} catch (err) {
		return message.reply("<:oliy:327462998610280448> **This number never even existed *in the first place*.**");
	}
	// TODO: Remove from phonebook
	message.reply(`<:blobsad:386228996486070272> This number's been deassigned.. R.I.P \`${args}\`.`);
	await client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:closed_book: Number \`${args}\` is DE-assigned from channel ${number._id} by ${message.author.username}.`,
	}));
	await number.remove();
};
