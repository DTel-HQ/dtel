module.exports = async(client, msg, suffix) => {
	client.api.channels(msg.channel.id).typing.post();
};
