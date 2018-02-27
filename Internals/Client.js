const { Client } = require("discord.js");
const ShardUtil = require("./modules/ShardUtil");
const ProcessAsPromised = require("process-as-promised");

module.exports = class client extends Client {
	constructor(options) {
		super(options);
		this.IPC = new ProcessAsPromised();
		this.shard = new ShardUtil(this);
		this.setMaxListeners(options.maxListeners);
		this.blacklist = {
			guilds: [],
			users: [],
		};
	}
	async permCheck(id) {
		if (!id) throw new Error("No member specified.");
		let toRet = {
			boss: false,
			support: false,
			donator: false,
		};
		let member;
		try {
			member = await this.api.guilds(process.env.SUPPORTGUILD).members(id).get();
			if (!member) throw new Error("Member not found.");
		} catch (err) {
			return err;
		}
		if (member.roles.includes(process.env.BOSSROLE)) toRet.boss = true;
		if (member.roles.includes(process.env.SUPPORTROLE)) toRet.support = true;
		if (member.roles.includes(process.env.DONATORROLE)) toRet.donator = true;
		return toRet;
	}
	async apiSend(content, channel) {
		if (!content || !channel) throw new Error("Missing parameters.");

		let foundChannel;
		try {
			foundChannel = await this.api.channels(channel).get();
			if (!foundChannel) throw new Error("Channel could not be found.");
		} catch (err) {
			return err;
		}

		await this.api.channels(channel).messages.post({
			data: {
				content,
			},
		});
	}
	async apiEdit(content, channel, message) {
		if (!content || !channel || !message) throw new Error("Missing parameters.");

		let foundChannel;
		try {
			foundChannel = await this.api.channels(channel).get();
			if (!foundChannel) throw new Error("Channel could not be found.");
		} catch (err) {
			return err;
		}

		let foundMessage;
		try {
			foundMessage = await this.api.channels(channel).messages(message).get();
			if (!foundMessage) throw new Error("Message could not be found.");
		} catch (err) {
			return err;
		}

		await this.api.channels(channel).messages(message).patch({
			data: {
				content,
			},
		});
	}
};
