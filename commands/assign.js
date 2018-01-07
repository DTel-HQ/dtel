// REWRITTEN
module.exports = async(bot, message, args) => {
	let channel = args.substring(0, args.indexOf(" ")).trim();
	let number = args.substring(args.indexOf(" ") + 1).trim();
	// const support = user_id => bot.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	const support = user_id => message.author.id === user_id;
	if (!support(message.author.id)) return;
	if (!args) {
		return message.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!**");
	}
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
		return message.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?**");
	}
	let foundNumber;
	try {
		foundNumber = await Numbers.findOne({ number: number });
	} catch (err) {
		// Ignore
	}
	if (foundNumber) {
		return message.reply("<:francis:327464171211849728> **This number is already registered!**");
	}
	let foundChannel;
	try {
		foundChannel = await Numbers.findOne({ _id: channel });
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
	bot.channels.get(process.env.LOGSCHANNEL).send(`:green_book: Number \`${numberDocument.number}\` is assigned to channel ${numberDocument._id} by ${message.author.tag}.`);
};
