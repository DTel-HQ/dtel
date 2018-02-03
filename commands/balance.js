module.exports = async(client, msg, suffix) => {
	let account;
	try {
		account = await Accounts.findOne({ _id: msg.author.id });
		if (!account) throw new Error();
	} catch (err) {
		await Accounts.create(new Accounts({
			_id: msg.author.id,
		}));
		msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	if (account) {
		msg.channel.send({
			embed: {
				color: 0x007FFF,
				title: "Current Account Status",
				fields: [{
					name: "Your Balance",
					value: account.balance,
				},
				{
					name: "Recharging",
					value: "http://discordtel.readthedocs.io/en/latest/Payment/",
				}],
			},
		});
	}
};
