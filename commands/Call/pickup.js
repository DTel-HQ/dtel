module.exports = async(client, msg, suffix) => {
	let call = await Calls.find(c => c.to.channel === msg.channel.id);
	if (!call || call.pickedUp) return;

	await client.apiSend(":heavy_check_mark: The other side picked up!\n\nYou can now put the call on `>hold`, or transfer a call to another number by using `>transfer <number>`.", call.from.channel)
		.catch(async _ => {
			await Calls.newGet(call.id).delete();
			return msg.reply(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.");
		});

	call.pickedUp = true;
	await Calls.update(call);
	await client.log(`:white_check_mark: The call between channel ${call.from.channel} and channel ${call.to.channel} was picked up by **${msg.author.tag}** (${msg.author.id}).`);
	await msg.reply(":white_check_mark: You picked up the call.\n\nYou can now put the call on `>hold`, or transfer the call to another number by using `>transfer <number>`!");

	let interval = setInterval(async() => {
		call = await Calls.find(c => c.to.channel == msg.channel.id);
		if (!call) return clearInterval(interval);
		if (!call.lastMessage || call.lastMessage + 290000 < new Date().getTime()) {
			try {
				client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.from.channel);
				client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.to.channel);
			} catch (e) {
				await Calls.newGet(call.id).delete();
				await r.table("OldCalls").insert(call);
				try {
					client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", call.from.channel);
					client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", call.to.channel);
				} catch (_) {
					// nothing to worry about
				}
			}
		}
	}, 300000);
};
