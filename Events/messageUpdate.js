const { MessageEmbed } = require("discord.js");

module.exports = async(omsg, nmsg) => {
	if (nmsg.author.bot) return;
	let call = await nmsg.channel.call;
	if (!call || !call.pickedUp || call.hold || !nmsg.content) return (await reload("./Events/message.js"))(nmsg);

	let perms = await nmsg.author.getPerms();
	let prefix = nmsg.content.startsWith(client.user) ? `${client.user} ` : nmsg.content.startsWith(config.prefix) ? config.prefix : nmsg.author.account().prefix || config.prefix;
	if (nmsg.content.startsWith(prefix)) return;

	// Get the channel to edit in
	let editChannel = call.to.channel === nmsg.channel.id ? call.from.channel : call.to.channel;
	let fromSide = call.to.channel === nmsg.channel.id ? call.to : call.from;
	let hidden = fromSide.hidden;
	try {
		await client.api.channels(editChannel).get();
	} catch (_) {
		client.apiSend({ embed: { color: config.colors.error, title: "The bot can no longer access the opposite side", description: "Please report this by calling `*611` as it could be a troll call." } }, nmsg.channel.id);
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(call.to.channel === nmsg.channel.id ? call.from.number : call.to.number, { force: false, log: true, origin: "msgEdit" });
	}

	// Get the message to edit
	let message = call.messages.find(m => m.umsg === omsg.id);
	if (!message) return;

	let phone = config.callPhones.default;
	if (fromSide.vip) phone = config.callPhones.donator;
	if (!hidden) for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];

	let toCSChannel = editChannel === config.supportChannel;
	let toSend = `**${hidden ? "Anonymous#0000" : nmsg.author.tag}${toCSChannel ? ` (${nmsg.author.id})` : ""} [edited]** ${phone} ${nmsg.content}`;
	let edited = await client.apiEdit(toSend, editChannel, message.dtelmsg);
	if (!edited.id) {
		await client.apiSend(`${toSend}`, editChannel);
	}

	let edits = call.edits || {};
	let editsById = edits[nmsg.id] || [];
	editsById.push({ time: new Date() });
	edits[nmsg.id] = editsById;
	await r.table("Calls").get(call.id).update({ edits: edits });
};
