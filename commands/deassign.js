const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, message, args) => {
	let perms = await permCheck(client, message.author.id);
	if (!perms.support) return;
	if (!args) {
		return message.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
	}
	let number, type;
	try {
		number = await Numbers.findOne({ _id: args });
		if (!number) throw new Error();
		type = "channel";
	} catch (err) {
		try {
			number = await Numbers.findOne({ number: args });
			if (!number) throw new Error();
			type = "number";
		} catch (err2) {
			return message.reply("<:oliy:327462998610280448> **This number never even existed *in the first place*.**");
		}
	}
	let pbentry;
	try {
		pbentry = await Phonebook.findOne({ _id: number.number });
		if (!pbentry) throw new Error();
		await pbentry.remove();
	} catch (err) {
		//
	}
	message.reply(`<:blobsad:386228996486070272> This number's been deassigned.. R.I.P \`${number.number}\`.`);
	await client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:closed_book: Number \`${number.number}\` is DE-assigned from channel ${number._id} by ${message.author.username}.`,
	}));
	await number.remove();
};
