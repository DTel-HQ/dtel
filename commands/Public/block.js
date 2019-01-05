module.exports = async(client, msg, suffix) => {
	// Help users a bit by removing spaces & '-'
	let toBlock = await suffix.replace(/[-\s]/g, "");
	let myNumber = await r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);

	if (!myNumber) return msg.reply("This channel doesn't have a number.");

	let perm = await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");

	if (!perm) {
		msg.reply("You need manage server permissions to do this.");
	} else if (!toBlock) {
		msg.reply("To block a number from calling you: `>block [number]`");
		// only 11numb long 030* and 0900 numbers allowed
	} else if (!toBlock.match(/^0[39]0\d{8}$/)) {
		msg.reply("Incorrect number. You can't block special numbers. Please report any abuse by calling `*611`");
	} else {
		let number = await r.table("Numbers").get(toBlock);
		if (!number) {
			msg.reply("That number could not be found.");
		} else {
			let blocked = myNumber.blocked || [];
			let index = blocked.indexOf(toBlock);
			if (index > -1) {
				blocked.splice(index);
				await r.table("Numbers")
					.getAll(msg.channel.id, { index: "channel" })
					.nth(0)
					.default(null)
					.update({ blocked: blocked });
				msg.reply(`${toBlock} has been unblocked.`);
				await client.log(`:name_badge: Number \`${toBlock}\` has been unblocked by number \`${myNumber.id}\`.`);
			} else {
				blocked.push(toBlock);
				await r.table("Numbers").get(myNumber.id).update({ blocked: blocked });
				msg.reply(`${toBlock} has been blocked, please report any abuse by calling \`*611\``);
				await client.log(`:no_entry: Number \`${toBlock}\` has been blocked by number \`${myNumber.id}\`.`);
			}
		}
	}
};
