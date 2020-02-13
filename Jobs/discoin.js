const auth = require("../Configuration/auth.js");
const Discoin = require("@discoin/scambio").default;
const DClient = new Discoin(auth.discoinToken, "DTS");

// Get Discoin transactions
module.exports = scheduleJob => scheduleJob("*/1 * * * *", async() => {
	if (client.user.id != config.botID) return;
	if (!client.shard.id === client.shard.shardCount - 1 || !client.done) return;
	const unhandled = await DClient.transactions.getMany(DClient.commonQueries.UNHANDLED_TRANSACTIONS);
	if (!unhandled.length) return;
	for (const transaction of unhandled) {
		// Try to fetch user
		let user = await client.users.fetch(transaction.user)
			.catch(e => {
				client.apiSend(`[Discoin] couldn't find user ${transaction.user}`, "326075875466412033");
				return null;
			});

		// patch
		transaction.update({ handled: true })
			.catch(async e => {
				client.apiSend(`Yo, there might be something wrong with the Discoin API.\n\`\`\`\n${e}\n\`\`\``, "348832329525100554");
				let dmChannel = await user.createDM().catch(_ => null);
				if (dmChannel) dmChannel.send({ embed: { color: config.colors.error, title: "Tried processing your transaction...", description: `Some error popped up instead:\n\`\`\`json\n${e.stack}\n\`\`\`\nSee [here](https://dash.discoin.zws.im/#/transactions/${transaction.id}/show) for transaction details.`, timestamp: new Date(), author: { name: client.user.username, icon_url: client.user.displayAvatarURL() } } });
				return null;
			});

		// add amount
		let account = await user.account(true);
		account.balance += transaction.payout;
		await r.table("Accounts").get(account.id).update({ balance: account.balance });

		// Send msgs
		let dmChannel = await user.createDM().catch(e => null);
		if (dmChannel) dmChannel.send({ embed: { color: config.colors.receipt, title: "You received credits from Discoin", description: `<:DTS:668551813317787659>${transaction.payout} has been added to your account through Discoin. See [here](https://dash.discoin.zws.im/#/transactions/${transaction.id}/show) for transaction details.`, timestamp: new Date(), author: { name: client.user.username, icon_url: client.user.displayAvatarURL() } } });
		client.log(`:repeat: ${user.username} (${user.id}) received <:DTS:668551813317787659>${transaction.payout} from Discoin.`);
	}
});
