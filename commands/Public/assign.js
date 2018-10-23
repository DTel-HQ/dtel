module.exports = async(client, msg, suffix) => {
	let channel = suffix.split(" ")[0];
	let number = suffix.split(" ")[1];

	const perms = msg.author.getPerms();
	if (!perms.support) return;

	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!** Syntax: `>assign (channelid) (number)`");
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

	if (isNaN(number) || !/^0(30|900|8)/.test(number) || number.length !== 11) {
		return msg.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?** Course not, you dumbass");
	}

	let foundNumber;
	r.table("Numbers").get()
};
