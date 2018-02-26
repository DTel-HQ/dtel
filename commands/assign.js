const permCheck = require("../modules/permChecker");

module.exports = async(client, message, args) => {
	let channel = args.substring(0, args.indexOf(" ")).trim();
	let number = args.substring(args.indexOf(" ") + 1).trim();
	let perms = await permCheck(client, message.author.id);
	if (!perms.support) return;
	if (!args) return message.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!**");
	number = number.replace(/(a|b|c)/ig, "2")
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
		.replace(/\s+/g, "");
	if (isNaN(number) || (!number.startsWith("0301") && !number.startsWith("0800") && !number.startsWith("0900")) || number.length !== 11) {
		return message.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?** Course not, you dumbass");
	}
	let foundNumber;
	try {
		foundNumber = await Numbers.findOne({ number: number });
	} catch (err) {
		// Ignore
	}
	if (foundNumber) {
		return message.reply("<:francis:327464171211849728> **This number is already registered:tm:!**");
	}
	let foundChannel;
	try {
		foundChannel = await Numbers.findOne({ _id: channel });
		if (!foundChannel) throw new Error();
	} catch (err) {
		// Ignore
	}
	if (foundChannel) {
		return message.reply("<:francis:327464171211849728> **There is already a number in this channel!**");
	}
	const expiryDate = new Date();
	expiryDate.setMonth(expiryDate.getMonth() + 1);
	let numberDocument = await Numbers.create(new Numbers({ _id: channel, number: number, expiry: expiryDate }));
	message.reply("Done. Now turn back to your client!");
	client.channels.get(process.env.LOGSCHANNEL).send(`:green_book: Number \`${numberDocument.number}\` is assigned to channel ${numberDocument._id} by ${message.author.tag}.`);
};
