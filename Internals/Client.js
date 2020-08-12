module.exports = Discord => class DTelClient extends Discord.Client {
	async apiSend(data, channel) {
		if (!data || !channel) throw new Error("Missing parameters.");

		let foundChannel;
		try {
			foundChannel = await this.api.channels(channel).get();
			if (!foundChannel) throw new Error("Channel could not be found.");
		} catch (err) {
			return err;
		}

		let toSendData = {
			data: {
				content: {},
				files: [],
			},
		};

		if (typeof data === "object") toSendData.data = data;
		else toSendData.data.content = data;
		toSendData.data.mention_everyone = false;

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
		let times = [d, h, m, s];
		let suffix = ["d", "h", "m", "s"];
		let string = "";

		for (let i = 0; i < times.length; i++) {
			let t = times[i];
			if (!t) continue;
			t = t.toString().length === 2 ? t : `0${t}`;
			string = `${string}${t}${suffix[i]}`;
		}

		return string;
	}

	format(number) {
		if (!/\d+/.test(number.toString())) return new Error(`Client#format input was not a number: ${number}`)
		number = !number ? 0 : number < 1 ? Number.parseFloat(number).toPrecision(2) : (Math.round(number * 100) / 100);
		return number.toString().replace(/\d(?<!\.\d*)(?=(\d{3})+(\.|$))/g, "$&,");
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
		if (typeof settings != "object") settings = {};
		let defSettings = {
			force: false,
			log: true,
			origin: "unknown",
		};

		let keys = Object.keys(defSettings);
		for (let i = 0; i < keys.length; i++) {
			if (!settings[keys[i]]) settings[keys[i]] = defSettings[i];
		}

		let { force, log, origin } = settings;

		setTimeout(async() => {
			if (typeof number != "object") number = await r.table("Numbers").get(number);
			let channelID = typeof number == "object" ? number.channel : (await r.table("Numbers").get(number)).channel;
			if (!channelID && !force) return;
			let channel = await client.api.channels(channelID).get().catch(e => null);

			if (!channel || force) {
				await r.table("Numbers").get(number.id).delete();
				await r.table("Phonebook").get(number.id).delete();
				await r.table("Mailbox").get(number.channel).delete();
				if (log) client.log(`📕 Number \`${number.id}\` has been automatically deassigned from ${origin}.`);

				const numbers = await r.table("Numbers");

				// remove the number from contacts
				const contactNumbers = numbers.filter(n => n.contacts && (n.contacts.filter(c => c.number === number.id))[0]);
				for (let contactNumber of contactNumbers) {
					let contacts = number.contacts;
					let contact = contacts.filter(c => c.name === number.id);
					contacts.splice(contacts.indexOf(contact), 1);
					await r.table("Numbers").get(contactNumber.id).update({ contacts: contacts });
				}

				// remove the number from blocked → may lead to abuse though
				const blockedNumbers = numbers.filter(n => n.blocked && n.blocked.includes(number.id));
				for (let blockedNumber of blockedNumbers) {
					let blocked = blockedNumber.blocked;
					blocked.splice(blocked.indexOf(number.id), 1);
					await r.table("Numbers").get(blockedNumber.id).update({ blocked: blocked });
				}
			}
		}, force ? 1000 : 600000);
	}
};
