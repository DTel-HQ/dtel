module.exports = async(client, msg, suffix) => {
	msg.channel.send(`pong - ${client.ws.ping}`);
};
