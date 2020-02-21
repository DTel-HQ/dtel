const auth = require("../Configuration/auth.js");
const Discoin = require("@discoin/scambio").default;

module.export = scheduleJob => {
	// Discoin report hourly
	scheduleJob("0 0 */12 * * *", async() => {
		if (client.user.id != config.botID) return;
		const currencies = await Discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC"),
			emojis = client.guilds.get("347859709711089674").emojis;

		const prevrates = (await r.table("Accounts").get("discoin")).rates;
		const strings = {};
		for (let currency of currencies) {
			if (currency.value === prevrates[currency.id]) {
				strings[currency.id] = "";
				continue;
			}
			let change = currency.value / prevrates[currency.id];
			if (change < 1) change = 1 - change;
			else change -= 1;
			change = Math.round(change * 10000) / 100;
			const positive = currency.value > prevrates[currency.id];
			if (change > 0) {
				if (positive) change = `+${change}`;
				else change = `-${change}`;
			} else {
				change = "<0.01";
			}
			strings[currency.id] = ` ${positive ? ":chart_with_upwards_trend:" : ":chart_with_downwards_trend:"} ${change}%`;
		}

		await client.apiSend({ embed: {
			title: "<:Discoin:357656754642747403>iscoin Rates",
			color: 0x2196f3,
			description: currencies.map(c => `${emojis.find(e => e.name === c.id).toString()} ${c.value}${strings[c.id]}`).join("\n"),
			timestamp: new Date(),
		} }, "661239975752499231");
		const newrates = {};
		for (let currency of currencies) {
			newrates[currency.id] = currency.value;
		}
		await r.table("Accounts").get("discoin").update({ rates: newrates });
	});

	// hourly and daily data saving
	scheduleJob("0 0 */1 * * *", async() => {
		const currencies = await Discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC"),
			discoin = await r.table("Accounts").get("discoin"),
			hourlyRates = discoin.hourly || {},
			dailyRates = discoin.daily || {},
			daily = new Date().getHours() === 0;

		for (let currency in currencies) {
			const rate = currencies[currency].value;

			const hrates = hourlyRates[currency] || [];
			if (hrates.length >= 24) hrates.push(rate).pop();
			else hrates.push(rate);
			hourlyRates[currency] = hrates;

			if (daily) {
				const drates = dailyRates[currency] || [];
				if (drates.length >= 7) drates.push(rate).pop();
				else drates.push(rate);
				dailyRates[currency] = drates;
			}
		}

		await r.table("Accounts").get("discoin").update({ hourly: hourlyRates, daily: dailyRates });
	});
};
