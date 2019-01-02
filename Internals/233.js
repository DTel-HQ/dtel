module.exports = async(msg, myNumber) => {
	let account = await r.table("Accounts").get(msg.author.id).default(null);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		r.table("Accounts").insert(account);
	}

	let renewrate = 500;

	if (account.balance < renewrate) {
		return msg.channel.send({
			embed: {
				title: "Current Number Status",
				description: "You have less than 500 credits which means you cannot renew your number.",
				fields: [{
					name: "Number",
					value: `${myNumber.id}`,
				},
				{
					name: "Expiration",
					value: `${new Date(myNumber.expiry).getFullYear()}/${new Date(myNumber.expiry).getMonth() + 1}`,
				},
				{
					name: "Your Balance",
					value: `${account.balance}`,
				},
				{
					name: "How to recharge",
					value: "http://discordtel.austinhuang.me/en/latest/Payment/",
				}],
			},
		});
	} else {
		let mainEmbed = await msg.channel.send({
			embed: {
				color: 3447003,
				title: "Current Number Status",
				description: "Type the amount of months you want to renew your number.",
				fields: [{
					name: "Number",
					value: myNumber.id,
				},
				{
					name: "Expiration",
					value: `${new Date(myNumber.expiry).getFullYear()}/${new Date(myNumber.expiry).getMonth() + 1}`,
				},
				{
					name: "Your Balance",
					value: `${account.balance}`,
				},
				{
					name: "How to recharge",
					value: "http://discordtel.austinhuang.me/en/latest/Payment/",
				}],
				footer: {
					text: "To hang up, press `0`.",
				},
			},
		});

		let collector = msg.channel.createMessageCollector(newmsg => msg.author.id === newmsg.author.id);
		collector.on("collect", async cmsg => {
			if (cmsg.content === "0") {
				await mainEmbed.delete();
				cmsg.reply(":white_check_mark: You hung up the call.");
				return collector.stop();
			}
			if (!cmsg.match(/[^0-9]/)) {
				cmsg.delete();
				mainEmbed = await mainEmbed.edit({
					embed: {
						color: 3447003,
						title: "Invalid renewal period",
						description: "Type the **number** of months you want to renew your number.",
						fields: [{
							name: "Number",
							value: myNumber.id,
						},
						{
							name: "Expiration",
							value: `${new Date(myNumber.expiry).getFullYear()}/${new Date(myNumber.expiry).getMonth() + 1}`,
						},
						{
							name: "Your Balance",
							value: `${account.balance}`,
						},
						{
							name: "How to recharge",
							value: "http://discordtel.austinhuang.me/en/latest/Payment/",
						}],
						footer: {
							text: "To hang up, press `0`.",
						},
					},
				});
				return;
			}
			let renewcost = renewrate * Number(cmsg.content);
			if (!account.balance >= renewcost) {
				const d = new Date(myNumber.expiry);
				d.setMonth(d.getMonth() + parseInt(cmsg.content));
				r.table("Accounts").get(msg.author.id).update({ balance: account.balance -= renewcost });
				r.table("Numbers").get(myNumber.id).update({ expiresAt: d });
				collector.stop();
				cmsg.delete();

				return msg.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Error: Insufficient funds!",
						description: "Type the amount of months you want to renew your number",
						fields: [{
							name: "Number",
							value: myNumber.id,
						},
						{
							name: "Expiration",
							value: `${new Date(myNumber.expiry).getFullYear()}/${new Date(myNumber.expiry).getMonth() + 1}`,
						},
						{
							name: "Your Balance",
							value: `${account.balance}`,
						},
						{
							name: "How to recharge",
							value: "http://discordtel.austinhuang.me/en/latest/Payment/",
						}],
					},
				});
			}
		});
	}
};
