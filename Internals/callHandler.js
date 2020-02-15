const { MessageEmbed } = require("discord.js");

module.exports = async(cmd, msg, suffix, call) => {
	let embed = null,
		content;

	if (!call.pickedUp || call.hold || (!msg.content && !msg.attachments.first())) return;
	call.lastMessage = new Date().getTime();
	await r.table("Calls").get(call.id).update(call);

	const perms = await msg.author.getPerms();
	let fromvip = msg.channel.id === call.from.channel ? call.from.vip : call.to.vip;

	// get tosend channel
	let fromSend = msg.channel.id === call.from.channel ? call.from : call.to;
	let toSend = msg.channel.id === call.from.channel ? call.to : call.from;
	let toSendSupport = toSend.channel === config.supportChannel;

	// Send hidden?
	let hidden = toSendSupport ? false : fromSend.hidden;

	// get right phone
	let phone = config.callPhones.default;
	if (fromvip) phone = config.callPhones.donator;
	if (!hidden) for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];

	if (msg.attachments.first()) {
		let attachment = msg.attachments.first();
		embed = new MessageEmbed()
			.setColor(config.colors.info)
			.setAuthor(hidden ? "Anonymous" : msg.author.tag)
			.setTitle("Attachment")
			.setImage(attachment.url)
			.setFooter(attachment.name || "")
			._apiTransform();
	}

	try {
		await client.api.channels(toSend.channel).get();
	} catch (_) {
		client.apiSend({ embed: { color: config.colors.error, title: "The bot can no longer access the opposite side", description: "Please report this by calling `*611` as it could be a troll call." } }, msg.channel.id);
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(toSend.number, { force: false, log: true, origin: "callHandler" });
	}

	// send the msg
	if (msg.content) content = `**${hidden ? `Anonymous#${msg.author.id.slice(-4)}` : msg.author.tag}${toSendSupport ? ` (${msg.author.id})` : ""}** ${phone} ${msg.content}`;
	while (/@(everyone|here)/ig.test(content)) {
		content = content.replace(/@(everyone|here)/ig, "_I tried to ping everyone but failed._");
	}
	if (content && content.length > 2000) return;
	let sent = await client.apiSend({ content: content, embed: embed }, toSend.channel);

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
