import { EmbedBuilder } from "@discordjs/builders";
import config from "../../config/config";
import Command from "../../internals/commandProcessor";
import { formatBalance } from "../../internals/utils";
import os from "os";

export default class Stats extends Command {
	format = formatBalance;

	async run(): Promise<void> {
		const DTS = config.dtsEmoji;

		// basic stats
		const guildCount = await this.client.shard!.fetchClientValues("guilds.cache.size")
			.then(results => (results as number[]).reduce((prev, val) => prev + val, 0) || this.client.guilds.cache.size);
		const shardCount = process.env.SHARDS;

		const numberCount = await this.db.numbers.count();
		const yellowCount = await this.db.phonebook.count();

		const blacklisted = await this.db.blacklist.count();
		const whitelisted = await this.db.guildConfigs.count({
			where: {
				whitelisted: true,
			},
		});

		const expNumberCount = await this.db.numbers.count({
			where: {
				expiry: {
					lt: new Date(),
				},
			},
		});

		const firstOfThisMonth = new Date();
		firstOfThisMonth.setDate(1);
		firstOfThisMonth.setHours(0, 0, 0, 0);

		const endOfThisMonth = new Date();
		endOfThisMonth.setMonth(endOfThisMonth.getMonth() + 1);
		endOfThisMonth.setDate(0);
		endOfThisMonth.setHours(0, 0, 0, 0);

		const monthlyNewNumbers = await this.db.numbers.count({
			where: {
				createdAt: {
					gte: firstOfThisMonth,
					lte: endOfThisMonth,
				},
			},
		});

		const totalBalance = formatBalance((await this.db.accounts.aggregate({
			_sum: {
				balance: true,
			},
		}))._sum.balance || 0);


		const totalUsers = await this.db.accounts.count();
		const middleUser = Math.ceil(totalUsers / 2);

		const medianBalance = (await this.db.accounts.findFirst({
			skip: middleUser - 1,
		}))?.balance || 0;

		const totalUsersWithBal = await this.db.accounts.count({
			where: {
				balance: {
					not: 0,
				},
			},
		});

		const middleUserWithBal = Math.ceil(totalUsersWithBal / 2);
		const filteredMedian = (await this.db.accounts.findFirst({
			skip: middleUserWithBal - 1,
		}))?.balance || 0;

		const top5Users = await this.db.accounts.findMany({
			orderBy: {
				balance: "desc",
			},
			take: 5,
		});

		const embed = new EmbedBuilder()
			.setTitle("DTel Statistics")
			.setColor(config.colors.info)
			.setAuthor({
				name: this.client.user.tag,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.addFields([{
				name: "Server",
				value: `Shards: ${shardCount}\nRAM usage: ${this.format(process.memoryUsage().heapUsed / 1024 / 1024)}MB\nLoad avgs: ${os.loadavg().map(avg => this.format(avg * 100)).join(" | ")}`,
				inline: true,
			}, {
				name: "Numbers",
				value: `Total: ${this.format(numberCount)}\nYellowbook: ${yellowCount}\nExpired: ${expNumberCount}\nMonthly new: ${monthlyNewNumbers}`,
				inline: true,
			}, {
				name: "Guilds",
				value: `Total: ${this.format(guildCount)}\nNo number: N/D`,
				inline: true,
			}, {
				name: "Lists",
				value: `Blacklisted: ${blacklisted}\nWhitelisted: ${whitelisted}`,
				inline: true,
			}, {
				name: "Economy",
				value: `Total: ${DTS}${totalBalance}\nMedian: ${DTS}${this.format(medianBalance)}\nFiltered median: ${DTS}${filteredMedian}`,
				inline: true,
			}, {
				name: "Top Balances",
				value: top5Users.map(acc => `${DTS}${this.format(acc.balance)} (<@${acc.id}>)`).join("\n"),
				inline: false,
			}])
			.setTimestamp();


		this.interaction.reply({ embeds: [embed] });
	}
}
