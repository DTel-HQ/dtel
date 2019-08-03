const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	let myNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (myNumber) return msg.reply("This channel already has a number. Call `*611` if you want to remove it.");

	let perm = msg.channel.type === "dm" ? true : await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");
	if (!perm) perm = (await msg.author.getPerms()).support;
	if (!perm) return msg.reply("You need to have `manage guild` permission to run this command.");

	let prefix = msg.channel.type == "dm" ? "0900" : `030${(client.shard.ids[0] + 1)}`;
	let toChoose = true;

	let embed = new MessageEmbed()
		.setColor(0xAAAAAA)
		.setTitle("Read this information before proceeding.")
		.addField(
			"This is a roleplay bot!",
			"In case you haven't noticed, this bot is a roleplay bot used to simulate a telephone system between Discord channels, which means it **cannot call real numbers!**"
		)
		.addField(
			"Documentation and TOS",
			`The documentation is located at ${config.siteLink}. **Please read it** as it contains important information, like the Terms Of Service, regarding the use of this bot.`
		)
		.addField(
			"Payment",
			`Your number must be renewed for every month of usage. The number will cost **${config.renewalRate}** in-bot credits per month, after 1 month of free period. You must type \`>dial *233\` to renew it. See [here](https://discordtel.austinhuang.me/en/latest/Payment/) for ways to get credits. **No real-money purchase is required to use this bot and renew your number.**`
		)
		.addField(
			"I'm done reading!",
			`Please enter the number you wish to enable in <#${msg.channel.id}>. The number must start with \`${prefix}\` followed by another 7 digits (or letters). Type \`0\` to quit the wizard.`
		);

	await msg.channel.send({ embed: embed });

	let number,
		expiryDate,
		description;

	// NUMBER
	let numberChooser = async() => {
		let collector = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id,
			{
				max: 1,
				time: 2 * 60 * 1000,
			}
		);

		let collected = collector.first();
		if (!collected) {
			return msg.reply("Wizard expired. Please run `>wizard` again when you have a number ready.");
		}
		if (collected.content.startsWith(config.prefix)) return;
		if (isNaN(collected.content)) numberChooser();
		if (collected.content == "0") return msg.reply("Exiting wizard...");

		number = await client.replaceNumber(collected.content);

		let regex = new RegExp(`^${prefix}\\d{7}$`);
		if (!regex.test(number)) {
			msg.reply("Invalid number, please try again.");
			return numberChooser();
		}

		let existingNumber = await r.table("Numbers").get(number);
		if (existingNumber) {
			msg.reply("That number already exists, please try again.");
			return numberChooser();
		}

		expiryDate = new Date();
		expiryDate.setMonth(expiryDate.getMonth() + 1);

		let numberDoc = {
			id: number,
			channel: msg.channel.id,
			expiry: expiryDate,
		};
		if (msg.channel.type != "dm") numberDoc.guild = msg.channel.guild.id;
		numberDoc.owner = msg.channel.type != "dm" ? msg.guild.ownerID : msg.author.id;

		await r.table("Numbers").insert(numberDoc);
		await client.log(`:blue_book: Number \`${number}\` has been self-assigned to channel ${numberDoc.channel} by ${msg.author.tag} (${msg.author.id})`);
		await msg.channel.send(`This channel's number is now ${number}. You can also put your number in the phonebook, meaning this number can be randomly called. If you want to do so, type a description for your number, othwerwise type \`skip\`.`);
		return phonebookChooser();
	};

	// PHONEBOOK

	let phonebookChooser = async() => {
		let collector = await msg.channel.awaitMessages(
			m => m.author.id == msg.author.id,
			{
				max: 1,
				time: 5 * 60 * 1000,
			}
		);

		let collected = collector.first();
		if (!collected) return msg.reply("Wizard timed out. Please call `*411` if you want to set a phonebook description.");
		if (collected.content.startsWith(config.prefix))	return;
		if (collected.content === "skip") {
			return embedSender();
		} else {
			description = collected.content.replace(/[~_`*]/g, "\\$1");

			let min = 15;
			let max = 500;
			let l = description.length;
			if (min > l || l > max) {
				await msg.reply(`Please ${min > l ? "add to" : "shorten"} your description to match the ${min > l ? "min" : "max"} of **${min > l ? min : max}** characters and try again.`);
				return phonebookChooser();
			}

			let phonebookDoc = {
				id: number,
				channel: msg.channel.id,
				description: description,
			};

			await r.table("Phonebook").insert(phonebookDoc);
			return embedSender();
		}
	};

	// INFORMATION

	let embedSender = async() => {
		embed = new MessageEmbed()
			.setColor(0x00e64d)
			.setTitle("Your number is all set up!")
			.setDescription("Here is all your information. If you have any questions or want to report any abuse of the service (eg. a troll call), call `*611`.")
			.addField(
				"Number",
				`${number}`,
				true
			)
			.addField(
				"Expiration",
				`${expiryDate}`,
				true
			)
			.setFooter("Wizard has been completed.");
		if (description) {
			embed.addField(
				"Phonebook description",
				`${description}`,
				true
			);
		}

		await msg.channel.send({ embed: embed });
	};

	if (toChoose) {
		toChoose = false;
		return numberChooser();
	}
};
