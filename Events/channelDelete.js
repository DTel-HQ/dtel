module.exports = async channel => {
	if (channel.type != "text") return;
	let number = await channel.number;
	if (!number) return;
	client.delete(number);
};
