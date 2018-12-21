module.exports = class DTelClient extends require("discord.js").Client {
	async apiSend(content, channel) {
		if (!content || !channel) throw new Error("Missing parameters.");

		let foundChannel;
		try {
			foundChannel = await this.api.channels(channel).get();
			if (!foundChannel) throw new Error("Channel could not be found.");
		} catch (err) {
			return err;
		}

		let toSendData = {
			data: {},
		};

		if (typeof content === "object") toSendData.data = content;
		else toSendData.data.content = content;

		return this.api.channels(channel).messages.post(toSendData);
	}

	replaceNumber(str) {
		return str
			.replace(/(a|b|c)/ig, "2")
			.replace(/(d|e|f)/ig, "3")
			.replace(/(g|h|i)/ig, "4")
			.replace(/(j|k|l)/ig, "5")
			.replace(/(m|n|o)/ig, "6")
			.replace(/(p|q|r|s)/ig, "7")
			.replace(/(t|u|v)/ig, "8")
			.replace(/(w|x|y|z)/ig, "9")
			.replace(/-/ig, "")
			.replace("(", "")
			.replace(")", "")
			.replace(/\s+/g, "");
	}
};
