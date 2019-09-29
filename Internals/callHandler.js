const { MessageAttachment, APIMessage } = require("discord.js");

module.exports = async(cmd, msg, suffix, call) => {
	if (!call.pickedUp || call.hold || !msg.content) return;
	call.lastMessage = new Date().getTime();
	await r.table("Calls").get(call.id).update(call);

	const perms = await msg.author.getPerms();
	let fromvip = msg.channel.id === call.from.channel ? call.from.vip : call.to.vip;

	let phone = config.callPhones.default;
	if (fromvip) phone = config.callPhones.donator;
	for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];
	let attachments = msg.attachments.first() ? msg.attachments.array().map(a => `\n${a.name ? `${a.name} - ` : ""}${a.url}`).join("") : null;

	let toSend = msg.channel.id === call.from.channel ? call.to.channel : call.from.channel;

	try {
		await client.api.channels(toSend).get();
	} catch (_) {
		client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", msg.channel.id);
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(msg.channel.id === call.from.channel ? call.to.number : call.from.number);
	}

	// Send msg, hidden?
	let hidden = call.from.channel == msg.channel.id ? call.from.hidden : call.to.hidden;

	// send the msg
	let content = { content: `**${toSend == config.supportChannel ? msg.author.tag : hidden && toSend != config.supportChannel ? "Anonymous" : msg.author.tag}${toSend === config.supportChannel ? ` (${msg.author.id})` : ""}** ${phone} ${msg.content}${attachments ? attachments : ""}` };
	let sent = await client.apiSend(content, toSend);

	let msgDoc = {
		dtelmsg: sent.id,
		msg: msg.content,
		umsg: msg.id,
		user: msg.author.id,
		time: msg.createdTimestamp,
	};
	call.messages ? call.messages.push(msgDoc) : call.messages = [msgDoc];
	await r.table("Calls").get(call.id).update(call);
};
