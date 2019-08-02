const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (!callDocument) return console.log("wtf no calldoc", callDocument);
	else if (!callDocument.pickedUp) return message.reply(":x: You can't put a pending call on hold!")
	if ((callDocument.to.number === "08006113835" || callDocument.from.number === "08006113835") && message.guild.id != process.env.SUPPORTGUILD) return message.reply(":x: You can't put `*611` on hold."); 
	let toSend;
	if (callDocument.to.channelID === message.channel.id) {
		toSend = callDocument.from.channelID;
	} else {
		toSend = callDocument.to.channelID;
	}
	let perms = await client.permCheck(message.author.id);
	if (callDocument.onHold === toSend && (process.env.SUPPORTGUILD != message.guild.id || !perms.support)) return message.reply("Only the other side can release a call hold.");
	else if (callDocument.onHold === "") {
		message.reply(":hourglass_flowing_sand: You have put this call on hold. Re-do `>hold` to release.");
		await client.apiSend(":hourglass_flowing_sand: The other side has put this call on hold.", toSend);
		callDocument.onHold = message.channel.id;
	} else if (callDocument.onHold === message.channel.id || process.env.SUPPORTGUILD === message.guild.id) {
		message.reply(":hourglass: You have ended the call hold.");
		await client.apiSend(":hourglass: Call hold ended.", toSend);
		callDocument.onHold = "";
	} else return message.reply("Unexpected `callDocument.onHold` value, please report this to `*611`.");
	try {
		let hangups = [];
		try {
			const fromChannel = await client.api.channels(callDocument.from.channelID).get();
			hangups.push({ channel: fromChannel.id, guild: fromChannel.guild_id });
			const toChannel = await client.api.channels(callDocument.to.channelID).get();
			hangups.push({ channel: toChannel.id, guild: toChannel.guild_id });
		} catch (err) {
			console.log(err);
		}
		client.IPC.send("stopTyping", { hangups });
	} catch (_) {
		// Ignore
	}
	await callDocument.save();
};
