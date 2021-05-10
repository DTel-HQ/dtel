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

	// ignore messages from blacklisted users
	if (await msg.author.blacklisted) return;

	// get right phone
	let phone = config.callPhones.default;
	if (fromvip) phone = config.callPhones.donator;
	if (!hidden) {
		if (msg.author.contributor) phone = config.callPhones.contributor;
		if (msg.author.donator) phone = config.callPhones.donator;
		if (msg.author.support) phone = config.callPhones.support;
	}

	if (msg.attachments.first()) {
		let attachment = msg.attachments.first();
		let ext = attachment.url.split(".")[attachment.url.split(".").length - 1];
		if (!["mp4", "mov"].includes(ext)) {
			embed = new MessageEmbed()
				.setColor(config.colors.info)
				.setAuthor(`Sent by ${hidden ? `Anonymous#${msg.author.id.slice(-4)}` : msg.author.tag}${toSendSupport ? ` (${msg.author.id})` : ""}`)
				.setURL(attachment.url)
				.setImage(attachment.url)
				.setFooter(attachment.name || "");
		} else {
			let videoMsg = `*${hidden ? `Anonymous#${msg.author.id.slice(-4)}` : msg.author.tag}${toSendSupport ? ` (${msg.author.id})` : ""} sent a video. Here's the link: ${attachment.url}*`;
			await client.apiSend({ content: videoMsg }, toSend.channel);
		}
	}

	try {
		await client.api.channels(toSend.channel).get();
	} catch (_) {
		if (call.connectionLost) return;

		client.apiSend({ embed: { color: config.colors.error, title: "Connection lost", description: "You can use `>hangup`, or wait to see if it reconnects. If the connection can't be re-established, the call will automatically be hung up in 10 minutes." } }, msg.channel.id);
		r.table("Calls").get(call.id).update({ connectionLost: true });

		let amt = 0;
		
		const lostInterval = setInterval(async () => {
			try {
				await client.api.channels(toSend.channel).get();

				clearInterval(lostInterval);

				let currentCall = r.table("Calls").get(call.id);
				if (currentCall.hungupBy) return;
				
				client.apiSend({ embed: { color: config.colors.success, description: "Connection has been re-established." } }, msg.channel.id);
			} catch (__) {
				amt++;

				if (amt >= 60) {
					client.apiSend({ embed: { color: config.colors.error, description: "The call has automatically ended as the other side could not be reached." } }, msg.channel.id);

					await r.table("OldCalls").insert(call);
					await r.table("Calls").get(call.id).delete();
					if (call.to.channel === config.supportChannel) {
						const channel = client.channels.cache.get(config.supportChannel);
						channel.overwritePermissions(client.supportChannelPerms, `Call lost access (${call.id})`);
					}
					return client.delete(toSend.number, { force: false, log: true, origin: "callHandler" });
				}
			}
		}, 1e4)
	}

	// send the msg
	if (msg.content) content = `**${hidden ? `Anonymous#${msg.author.id.slice(-4)}` : msg.author.tag}${toSendSupport ? ` (${msg.author.id})` : ""}** ${phone} ${msg.content}`;
	while (/@(everyone|here)/ig.test(content)) {
		content = content.replace(/@(everyone|here)/ig, "_I tried to ping everyone but failed._");
	}
	if (content && content.match(/(|a)<:\w+:\d+>/g) !== null) {
		content.match(/(|a)<:\w+:\d+>/g).map(e => {
			if (!client.emojis.cache.get(e.split(":")[2].replace(">", ""))) content = content.replace(e, `\`:${e.split(":")[1]}:\``);
		});
	}
	if (content && content.length > 2000) return;
	let sent = await client.apiSend({ content: content, embed: embed }, toSend.channel);

	let msgDoc = {
		dtelmsg: sent.id,

		umsg: msg.id,
		user: msg.author.id,
		time: msg.createdTimestamp,
	};
	call.messages ? call.messages.push(msgDoc) : call.messages = [msgDoc];
	await r.table("Calls").get(call.id).update(call);
};
