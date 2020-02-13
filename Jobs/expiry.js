const { MessageEmbed } = require("discord.js");

// Job to delete numbers if expired for a long time
module.exports = scheduleJob => scheduleJob("0 0 0 * * *", async() => {
	// Don't just change lastwarn k
	const warnDays = 15;
	const lastWarn = 29;
	const deleteDays = 30;

	let time = Date.now();
	const warnMS = time - (warnDays * 86400000);
	const lastWarnMS = time - (lastWarn * 86400000);
	const deleteMS = time - (deleteDays * 86400000);

	if (client.shard.id != 0) return;

	const numbers = await r.table("Numbers");

	for (let number of numbers) {
		let channel = await client.api.channels(number.channel).get().catch(e => null);
		if (!channel) {
			await client.delete(number, { force: true, log: true, origin: "scheduled_noChannel" });
			break;
		}
		let owner = number.guild ? (await client.api.guilds(number.guild).get().catch(e => null)).owner_id : null;

		let embed = new MessageEmbed()
			.setColor(config.colors.error);

		let otitle,
			odesc,
			ctitle,
			cdesc,
			account,
			newBalance;

		// v2 number has expiry as a date object, yet v3 has string (timestamp) so compromise
		let expiryMS = typeof number.expiry === "object" ? number.expiry.getTime() : new Date(number.expiry).getTime();

		if (expiryMS < deleteMS) {
			await client.delete(number, { force: true, log: true, origin: "scheduled_expired" });
			winston.info(`[ScheduleJob] Number ${number.id} deleted`);
			otitle = `Your number has been deleted`;
			odesc = `Your number (${number.id}) in <#${channel.id}> has been deleted as it has been expired for >${deleteDays} days.`;
			ctitle = `This channel's number has been deleted`;
			cdesc = `This channel's number (${number.id}) has been deleted as it has been expired for >${deleteDays} days.`;
		} else if (expiryMS < warnMS && expiryMS > warnMS - 86400000) {
			winston.info(`[ScheduleJob] Number ${number.id} warned`);
			otitle = `Your number will soon be deleted`;
			odesc = `Your number ${number.id} in <#${channel.id}> has expired and will be automatically deleted in ${deleteDays - warnDays} days. To prevent losing your number (and all that comes with it), please extend the duration of your number by calling \`*233\`. `;
			ctitle = `This number will soon be deleted`;
			cdesc = `This channel's number (${number.id}) has been expired for >${warnDays} days and will automatically be deleted in ${deleteDays - warnDays}. To prevent losing this number and all its settings, please extend it by calling \`*233\`.`;
		} else if (expiryMS < lastWarnMS && expiryMS > lastWarnMS - 86400000) {
			winston.info(`[ScheduleJob] Number ${number.id} lastwarned`);
			otitle = `❕This number will be deleted in 24h❕`;
			odesc = `Your number ${number.id} in <#${channel.id}> has been expired for >${lastWarn} days and will automatically be deleted in **24h**. To prevent losing your number (and all that comes with it), please extend the duration of your number by calling \`*233\`. `;
			ctitle = `❕This number will be deleted in 24h❕`;
			cdesc = `This channel's number (${number.id}) has been expired for >${lastWarn} days and will automatically be deleted in **24h**. To prevent losing this number and all its settings, please extend it by calling \`*233\`.`;
		} else if (expiryMS > time && expiryMS < time + 86400000) {
			// automatic renewal stuff
			account = await (await client.users.fetch(owner)).account();
			newBalance = account.balance - config.renewalRate;
		} else {
			continue;
		}
		if (newBalance && newBalance >= 0) {
			let newExpiry = new Date(number.expiry);
			newExpiry.setMonth(newExpiry.getMonth() + 1);
			await r.table("Accounts").get(account.id).update({ balance: newBalance });
			await r.table("Numbers").get(number.id).update({ expiry: newExpiry });
			embed.setColor(config.colors.success);
			otitle = `Automatic Renewal`;
			odesc = `Your number ${number.id} in <#${channel.id}> has expired. Seeing you have a sufficient balance, we have renewed it for you!\n\n**${config.renewalRate} credits have been deducted from your account.** Your current balance is ${newBalance} credits.`;
			ctitle = `Automatic Renewal`;
			cdesc = `This channel's number (${number.id}) has expired. Seeing the owner has a sufficient balance, we have renewed it for you!`;
			winston.info(`[ScheduleJob] Number ${number.id} renewed, user ${owner} balance ${newBalance}`);
		} else if (newBalance) {
			winston.info(`[ScheduleJob] Number ${number.id} renew failure, user ${owner} balance ${account.balance}`);
			otitle = `Automatic Renewal Failure`;
			odesc = `Your number (${number.id}) in <#${channel.id}> has expired. I am unable to deduct money from your account, so please call \`*233\` from <#${channel.id}> to manually renew your number.`;
			ctitle = `Automatic Renewal Failure`;
			cdesc = `This channel's number (${number.id}) has expired. I am unable to deduct money from the owner's account, so please call \`*233\` to manually renew the number.`;
		}

		embed.setTitle(ctitle)
			.setDescription(cdesc);
		await client.apiSend({ embed: embed }, channel.id).catch(e => null);
		embed.setTitle(otitle)
			.setDescription(odesc)
			.setFooter("You are receiving this as you are the owner of the server.");
		if (owner) {
			let dmChannel = await (await client.users.fetch(owner)).createDM().catch(e => null);
			if (dmChannel) dmChannel.send({ embed: embed }).catch(e => null);
		}
	}
});
