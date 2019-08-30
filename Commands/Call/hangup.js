module.exports = async(client, msg, suffix, call) => {
	if (call.to.number === "08006113835" && msg.channel.id != config.supportChannel) return;

	msg.reply(":negative_squared_cross_mark: You hung up the call.");
	client.apiSend(":x: The other side hung up the call.", msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
	await r.table("OldCalls").insert(call);
	await r.table("Calls").get(call.id).delete();
	client.log(`:negative_squared_cross_mark: ${call.rcall ? "Rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was hung up by ${msg.author.tag} (${msg.author.id}) on the ${msg.channel.id === call.from.channel ? "from" : "to"} side. ${call.id}`);
};
