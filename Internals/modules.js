const numberIsValid = async (channel, number) => {
	if (!channel || !number) return new Error("Missing arguments");
	if (typeof channel !== "object") channel; = await client.channels.cache.fetch(channel);
	if (!channel) return new Error("Couldn't find channel");
	if (number.length !== 11) return false;
	number = client.replaceNumber(number);
	if (!/^0(900|30\d|8(00|44))\d{7}$/.test(number)) return false;
	if ((channel.type !== "dm" && number.startsWith("0900")) || (channel.type === "dm" && number.startsWith("03"))) return false;
	return number;
};

modules.exports = {
	numberIsValid,
}
