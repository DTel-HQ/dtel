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

		return this.api.channels(channel).messages.post({
			data: {
				content,
			},
		});
	}
};
