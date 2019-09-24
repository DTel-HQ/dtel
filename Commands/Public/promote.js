const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	/*
    number.promote: {
      embed: {
        description: string
				number: string
        field1: { title: string, description: string }
        field2: <field1>
        field3: <field1>
      }
			lastEdited: id of user who last edited the embed
      lastmsg: id of bot msg
			lastuser: id of user who promoted last
      lastPromoted: timestamp
    }
  */

	// Do the necessary checks
	let number = await msg.channel.number;
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "This channel does not seem to have a number." } });
	msg.author.busy = true;
	let account = await msg.author.account;
	if (!number.promote) {
		number.promote = { lastmsg: null, lastuser: null, lastPromoted: null, lastEdited: null, embed: { title: null, description: null, number: null, field1: { title: null, description: null, n: 1 }, field2: { title: null, description: null, n: 2 }, field3: { title: null, description: null, n: 3 } } };
		await r.table("Numbers").get(number.id).update({ promote: number.promote });
	}
	// Get some variables loaded
	let promote = number.promote || {};
	let embed = promote.embed || {};

	let collected;

	// Needed later on
	let sEmbed = new MessageEmbed()
		.setColor(config.colors.info);

	// let setTitle = async setup => {
	// 	sEmbed.setTitle("Editing title")
	// 		.setDescription(`Please input a title. (min 5, max 25 characters)\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress._" : ""}`)
	// 		.setFooter("(0) to quit. This menu will expire in 3 minutes.")
	// 		.setTimestamp(new Date());
	//
	// 	omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
	// 		omsg = await msg.channel.send({ embed: sEmbed });
	// 	});
	//
	// 	if (collected) collected.delete().catch(e => null);
	// 	collected = (await msg.channel.awaitMessages(
	// 		m => m.author.id === msg.author.id && ((m.content.length > 4 && m.content.length < 26) || /^0$/.test(m.content)),
	// 		{ max: 1, time: 180000 }
	// 	)).first();
	//
	// 	if (collected) collected.delete().catch(e => null);
	// 	if (!collected || /^0$/.test(collected.content)) {
	// 		pmsg.delete().catch(e => null);
	// 		omsg.delete().catch(e => null);
	// 		msg.author.busy = false;
	//		return;
	// 	}
	//
	// 	embed.title = collected.content;
	// 	promote.lastEdited = msg.author.id;
	// 	if (setup) return setDescription(setup);
	// 	else await r.table("Numbers").get(number.id).update({ promote: { lastEdited: promote.lastEdited, embed: embed } });
	// 	return omsg.edit({ embed: { color: config.colors.succes, title: "Success", description: `Succesfully set title to: ${embed.title}` }, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } });
	// };

	// Functions for setup/changing individual settings
	let setDescription = async setup => {
		sEmbed.setTitle("Editing description")
			.setDescription(`This is a general description of what you/your server is about and what your number is for. (min 20, max 150 characters)\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress._" : ""}`)
			.setFooter("(0) to quit. This menu will expire in 5 minutes.")
			.setTimestamp(new Date());

		omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
			omsg = await msg.channel.send({ embed: sEmbed });
		});

		if (collected) collected.delete().catch(e => null);
		collected = (await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && ((m.content.length > 19 && m.content.length < 151) || /^0$/.test(m.content)),
			{ max: 1, time: 300000 }
		)).first();

		if (collected) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content)) {
			pmsg.delete().catch(e => null);
			omsg.delete().catch(e => null);
			msg.author.busy = false;
			return;
		}

		embed.description = collected.content;
		promote.lastEdited = msg.author.id;
		if (setup) return setNumber(setup);
		else await r.table("Numbers").get(number.id).update({ promote: { lastEdited: promote.lastEdited, embed: embed } });
		return omsg.edit({ embed: { color: config.colors.succes, title: "Success", description: `Succesfully set description to: ${embed.description}` }, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } });
	};

	let setNumber = async setup => {
		sEmbed.setTitle("Editing number")
			.setDescription(`If you have chosen your number based on letters (for example 0800support), you may input this here. If not, simply type \`skip\`.\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress._" : ""}`)
			.setFooter("(0) to quit. This menu will expire in 2 minutes")
			.setTimestamp(new Date());

		omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
			omsg = await msg.channel.send({ embed: sEmbed });
		});

		let filter = `${number.id.substring(0, 4)}\\w{7}`;
		let regExp = new RegExp(filter, "i");
		collected = (await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && (client.replaceNumber(m.content) === number.id || /^skip$/i.test(m.content) || /^0$/.test(m.content)),
			{ max: 1, time: 120000 }
		)).first();

		if (collected) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content) || (!setup && /^skip$/i.test(collected.content))) {
			pmsg.delete().catch(e => null);
			omsg.delete().catch(e => null);
			msg.author.busy = false;
			return;
		}

		if (!/^skip$/i.test(collected.content)) embed.number = collected.content;
		promote.lastEdited = msg.author.id;
		if (setup) return setFields(setup);
		else await r.table("Numbers").get(number.id).update({ promote: { lastEdited: promote.lastEdited, embed: embed } });
		return omsg.edit({ embed: { color: config.colors.succes, title: "Success", description: `Succesfully set number to: ${embed.number}` }, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } });
	};

	let setFields = async setup => {
		// Menu to choose field to edit
		let chooseField = async() => {
			let fieldsText = "";
			let fields = [embed.field1, embed.field2, embed.field3];
			for (let field of fields) {
				fieldsText += `(${field.n}) ${field.title || "Title"} - ${field.description || "Description"}\n`;
			}
			if (setup) fieldsText += "(4) Finish setup";

			sEmbed.setTitle("Editing features")
				.setDescription(`To make your number stand out more, you may have up to 3 features listed in your promotion.\nFeatures are optional and you may choose to leave some or all empty.\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress._" : ""}`)
				.addField("Fields", fieldsText)
				.setFooter("(0) to quit. This menu will expire in 2 minutes")
				.setTimestamp(new Date());

			omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
				omsg = await msg.channel.send({ embed: sEmbed });
			});

			sEmbed.spliceField(0, 1);

			if (collected) collected.delete().catch(e => null);
			collected = (await msg.channel.awaitMessages(
				async m => m.author.id === msg.author.id && setup ? /^[12340]$/.test(m.content) : /^[1230]$/.test(m.content),
				{ max: 1, time: 120000 }
			)).first();

			if (!collected || /^0$/.test(collected.content)) {
				pmsg.delete().catch(e => null);
				omsg.delete().catch(e => null);
				msg.author.busy = false;
				return;
			}

			if (/^4$/.test(collected.content)) return finishSetup();
			else return editField(collected.content);
		};

		let editField = async nr => {
			sEmbed.setTitle(`Editing title`)
				.setDescription(`Enter a short title for this feature. (min 5, max 25 characters)\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress._" : ""}`)
				.setFooter("(0) to quit. This menu will expire in 3 minutes")
				.setTimestamp(new Date());

			omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
				omsg = await msg.channel.send({ embed: sEmbed });
			});

			if (collected) collected.delete().catch(e => null);
			collected = (await msg.channel.awaitMessages(
				async m => m.author.id === msg.author.id && ((m.content.length > 4 && m.content.length < 26) || /^0$/.test(m.content)),
				{ max: 1, time: 180000 }
			)).first();

			if (!collected || /^0$/.test(collected.content)) {
				pmsg.delete().catch(e => null);
				omsg.delete().catch(e => null);
				msg.author.busy = false;
				return;
			}

			embed[`field${nr}`].title = collected.content;

			sEmbed.setTitle(`Editing description`)
				.setDescription(`Enter a description of this feature. (min 20, max 150 characters)\n\n_Please note that any explicit content will result in a strike/blacklist.${setup ? " \nQuitting during the setup will reset your progress." : ""}`)
				.setFooter("(0) to quit. This menu will expire in 5 minutes")
				.setTimestamp(new Date());

			omsg = await omsg.edit({ embed: sEmbed }).catch(async e => {
				omsg = await msg.channel.send({ embed: sEmbed });
			});

			collected = (await msg.channel.awaitMessages(
				async m => m.author.id === msg.author.id && ((m.content.length > 19 && m.content.length < 151) || /^0$/.test(m.content)),
				{ max: 1, time: 300000 }
			)).first();

			if (collected) collected.delete().catch(e => null);
			if (!collected || /^0$/.test(collected.content)) {
				pmsg.delete().catch(e => null);
				omsg.delete().catch(e => null);
				msg.author.busy = false;
				return;
			}

			embed[`field${nr}`].description = collected.content;

			if (!setup) await r.table("Numbers").get(number.id).update({ promote: { lastEdited: msg.author.id, embed: embed } });
			return chooseField(true);
		};

		return chooseField();
	};

	let finishSetup = async() => {
		msg.author.busy = false;

		oEmbed.setTitle("Please wait...")
			.setColor(config.colors.receipt)
			.setDescription("Creating your promotion message.")
			.setFooter("\u200B")
			.setTimestamp(new Date());

		await omsg.edit({ embed: oEmbed })
			.catch(async e => msg.channel.send({ embed: oEmbed }));

		await r.table("Numbers").get(number.id).update({ promote: { lastEdited: msg.author.id, embed: embed } });

		await pmsg.edit({ embed: await createEmbed(true, false) })
			.catch(async e => msg.channel.send({ embed: await createEmbed(true, false) }));

		oEmbed.setTitle("Success!")
			.setColor(config.colors.success)
			.setDescription("Here is your new promotion message! ||advertisements won't be shown||")
			.setFooter(msg.author.id, msg.author.displayAvatarURL())
			.setTimestamp(new Date());

		await omsg.edit({ embed: oEmbed })
			.catch(async e => msg.channel.send({ embed: oEmbed }));
	};


	// Get other variables loaded in
	let isvip = number.vip ? new Date(number.vip.exipiry).getTime() > Date.now() : false;
	let promoteTimeout = config.promoteTimeout * 86400000;
	let canPromote = promote.lastPromoted ? promote.lastPromoted + promoteTimeout < Date.now() : true;
	let canPromoteIn = canPromote ? null : (promote.lastPromoted + promoteTimeout) - Date.now();
	let cpaD = Math.floor(canPromoteIn / 86400000);
	canPromoteIn -= cpaD * 86400000;
	let cpaH = Math.floor(canPromoteIn / 3600000);
	canPromoteIn = cpaD ? `${cpaD}d${cpaH}h` : `${cpaH}h`;
	let hasMoney = account.balance > config.promoteCost;

	let gperms = msg.guild ? msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD") : true;

	// Create both embeds (Promote Embed, Options Embed)
	let createEmbed = async(preview, explicit) => {
		let pEmbed = {
			color: isvip ? config.colors.vip : config.colors.receipt,
			title: `${embed.number || number.id}${preview ? " (Preview embed)" : ""}`,
			description: embed.description || "Here goes the general description.",
			fields: [
				{
					name: embed.field1 ? embed.field1.title || "List your features!" : "List your features!",
					value: embed.field1 ? embed.field1.description || "Why should people call you?\nYou can list up to 3 features or simply (guild) interests!" : "Why should people call you? You can list up to 3 features or simply (guild) interests!",
				},
			],
			timestamp: new Date(),
		};

		if (preview) pEmbed.fields.push({ name: "Did you know?", value: `[VIP numbers](${config.paymentLink}) will be more prominently displayed.` });

		if (!explicit) {
			pEmbed.thumbnail = { url: msg.guild.iconURL({ size: 1024 }) };
			pEmbed.footer = { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() };
		}
		return pEmbed;
	};

	let oEmbed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Options")
		.setFooter("(0) to quit. This menu will expire after 2 minutes.");

	let description = `(1) Go through the setup.${!gperms && !msg.author.support ? " (Missing permission)" : ""}`;
	if (embed.description) description += `\n(2) Promote your number.${canPromote ? "" : ` (${canPromoteIn})`}\n(3) Change specific parts.${!gperms && !msg.author.support ? " (Missing permission)" : ""}`;
	if (promote.lastPromoted) {
		description += `\n(4) Remove previous promotion.${!gperms && !msg.author.support ? " (Missing permission)" : ""}`;
		let user = await client.users.fetch(promote.lastuser);
		oEmbed.addField(`Last promotion`, `By: ${user.tag}\n[View here](https://discordapp.com/channels/${config.supportGuild}/${config.promoteChannel}/${promote.lastmsg})`);
	}
	oEmbed.setDescription(description);

	let pmsg = await msg.channel.send({ embed: await createEmbed(true, false) });
	let omsg = await msg.channel.send({ embed: oEmbed });

	if (!embed.title && !gperms && !msg.author.support) return;
	let filter = "^[";
	if (gperms || msg.author.support) {
		filter += "1";
		if (embed.title) filter += "3";
		if (promote.lastPromoted) filter += "4";
	}
	if (embed.title && canPromote && hasMoney) filter += "2";
	filter += "]$";
	filter = new RegExp(filter);

	collected = (await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && (/^0$/.test(m.content) || filter.test(m.content)),
		{ max: 1, time: 120000 }
	)).first();

	if (collected) collected.delete().catch(e => null);
	if (!collected || /^0$/.test(collected.content)) {
		pmsg.delete().catch(e => null);
		omsg.delete().catch(e => null);
		msg.author.busy = false;
		return;
	}

	switch (collected.content) {
		case "1":
			return setDescription(true);

		case "2": {
			let cEmbed = new MessageEmbed()
				.setColor(config.colors.info)
				.setTitle(`Promoting ${number.id}`)
				.setDescription(`Promoting this number will cost ¥${config.promoteCost}. (non-refundable)\nDiscordTel staff have the right to delete this promotion at any time.`)
				.addField("Options", "If the server image, your name and/or profile picture contain explicit content, make sure to choose the explicit variant. You may also choose this in order to hide the before mentioned details.\n\n(1) Promote\n(2) Promote as explicit")
				.setFooter("(0) to quit. This menu will expire after 60 seconds.");

			omsg = await omsg.edit({ embed: cEmbed });
			collected = (await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && /^[012]$/.test(m.content),
				{ max: 1, time: 60000 }
			)).first();

			if (collected) collected.delete().catch(e => null);
			msg.author.busy = false;
			if (!collected || /^0$/.test(collected.content)) {
				pmsg.delete().catch(e => null);
				omsg.delete().catch(e => null);
				return;
			}
			omsg = await omsg.edit({ embed: { color: config.colors.info, title: "Promoting...", description: "This may take a moment." } });

			let newBalance = account.balance - 500;
			await r.table("Accounts").get(account.id).update({ balance: newBalance });

			let pEmbed = /^2$/.test(collected.content) ? await createEmbed(false, true) : await createEmbed(false, false);
			pEmbed.timestamp = new Date();
			let sent = await client.apiSend({ embed: pEmbed }, config.promoteChannel).catch(e => null);

			if (!sent) return omsg.edit({ embed: { color: config.colors.error, title: "Failed", description: `Something went wrong whilst sending the message. Please contact support by calling *611 or join our [support guild](${config.guildInvite}).` } });

			await r.table("Numbers").get(number.id).update({ promote: { lastmsg: sent.id, lastuser: msg.author.id, lastPromoted: Date.now() } });
			return omsg.edit({ embed: { color: config.colors.success, title: "Success", description: `Succesfully promoted this number.\nView the message [here](https://discordapp.com/channels/${config.supportGuild}/${config.promoteChannel}/${sent.id}).`, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() }, timestamp: new Date() } });
		}

		case "3": {
			pmsg.delete().catch(e => null);
			omsg.delete().catch(e => null);
			msg.author.busy = false;
			return msg.channel.send({ embed: { color: config.colors.error, title: "Unfinished feature", description: "Please use (1) for now." } });
		}

		case "4": {
			pmsg.delete().catch(e => null);
			omsg = await omsg.edit({ embed: { color: config.colors.info, title: "Confirmation", description: "Are you sure you want to delete the last promotion?\nCredits will not be refunded.\n\nRespond with `yes` or `no`.", footer: { text: "This menu will expire in 60 seconds." } } });

			collected = (await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && ["yes", "no"].includes(m.content.toLowerCase()),
				{ max: 1, time: 60000 }
			)).first();

			if (collected) collected.delete().catch(e => null);
			msg.author.busy = false;
			if (!collected || collected.content.toLowerCase() === "no") {
				return omsg.delete().catch(e => null);
			}
			omsg = await omsg.edit({ embed: { color: config.colors.info, title: "Deleting...", description: "Deleting the previous promotion." } });

			let deleted = await client.api.channels(config.promoteChannel).messages(promote.lastmsg).delete()
				.catch(e => null);

			if (!deleted) return omsg.edit({ embed: { color: config.colors.error, title: "Failed", description: "Unable to delete the message. Please request a manual deletion by calling `*611`" } });
			else return omsg.edit({ embed: { color: config.colors.success, title: "Success", description: "Deleted the previous promotion message.", footer: { text: msg.author.id }, timestamp: new Date() } });
		}
	}
};
