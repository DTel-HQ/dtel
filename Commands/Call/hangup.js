module.exports = async(client, msg, suffix) => {
	const call = await Calls.find(c => c.to.channel == msg.channel.id || c.from.channel == msg.channel.id);
	if (!call || (call.to.number === "08006113835" && msg.channel.id != config.supportChannel)) return;

	msg.reply(":negative_squared_cross_mark: You hung up the call.");
	await r.table("OldCalls").insert(call);
	await Calls.newGet(call.id).delete();
	client.apiSend(":x: The other side hung up the call.", msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
	client.log(`:negative_squared_cross_mark: ${call.rcall ? "Rcall" : "call"} \`${call.from.channel} → ${call.to.channel}\` was hung up by ${msg.author.tag} (${msg.author.id}) on the ${msg.channel.id === call.from.channel ? "from" : "to"} side. ||${call.id}||`);

	// add stop typing things later?
};
