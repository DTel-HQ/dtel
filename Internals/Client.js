module.exports = class DTelClient extends require("discord.js").Client {
	constructor(...arg) {
		super(...arg);
		this.init();
	}

	init() {
		let structures = require("fs").readdirSync("../Structures");
		for (let i of structures) if (i.endsWith(".js")) require(`../Structures/${i}`)();
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

		let toSendData = {
			data: {},
		};

		if (typeof content === "object") toSendData.data = content;
		else toSendData.data.content = content;

		return this.api.channels(channel).messages.post(toSendData);
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

		let toEditData = {
			data: {},
		};
		if (typeof content === "object") toEditData.data = content;
		else toEditData.data.content = content;

		return this.api.channels(channel).messages(message).patch(toEditData);
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

	time(s, m, h, d) {
		let times = { s: s, m: m, h: h, d: d };
		let string = "";
		for (let t in times) {
			let tt = times[t];
			if (!tt) break;
			if (tt.toString().length != 2) tt = `0${tt}`;
			string = `${tt}${t}${string}`;
		}
		return string;
	}

	format(number) {
		if (!/\d+/.test(number.toString())) return number;
		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	}

	async log(msg) {
		let date = new Date();
		let times = [
			await date.getHours(),
			await date.getMinutes(),
			await date.getSeconds(),
		];

		for (let i in times) {
			times[i] = times[i] < 10 ? `0${times[i]}` : times[i];
		}

		// Dont question it.
		let time = `[${times[0]}:${times[1]}:${times[2]}]`;
		msg = `\`${time}\` ${msg}`;

		await client.apiSend(msg, config.logsChannel)
			.catch(e => { if (e) { winston.error(`Couldn't log - shard: ${client.shard.id}, message: ${msg}`); } });
		return true;
	}

	delete(number, settings) {
		let force = settings.force;
		let stopLog = settings.log;

		setTimeout(async() => {
			if (typeof number != "object") number = await r.table("Numbers").get(number);
			let channelID = typeof number == "object" ? number.channel : (await r.table("Numbers").get(number)).channel;
			if (!channelID && !force) return;
			let channel = await client.api.channels(channelID).get().catch(e => null);

			if (!channel || force) {
				await r.table("Numbers").get(number.id).delete();
				await r.table("Phonebook").get(number.id).delete();
				await r.table("Mailbox").get(number.channel).delete();
				if (!force && !stopLog) client.log(`📕 Number ${number.id} has been automatically deassigned.`);
			}
		}, force ? 1000 : 600000);
	}
};
