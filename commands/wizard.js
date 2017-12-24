const fs = require("fs");
var fouroneone = JSON.parse(fs.readFileSync("../json/fouroneone.json", "utf8"));
var numbers = JSON.parse(fs.readFileSync("../json/numbers.json", "utf8"));
let guildnumber;

module.exports = async(bot, message, args) => {
	let mynumber;
	try {
		mynumber = numbers.find(c => c.channel === message.channel.id).number;
	} catch (err) {
		if (err && !mynumber) {
			try {
				guildnumber = message.guild.channels.map(c => numbers.find(i => i.channel == c.id).number);
			} catch (err2) {
				if (!err2 && guildnumber) {
					message.reply(":x: Error: You already have a number in this guild.");
				} else {
					if (!message.guild) {
						message.reply(`**WARNING: You're about to register a DM number for yourself.**\n\nPlease read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`0900\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
						fouroneone.push({ user: message.author.id, status: "6" });
						fs.writeFileSync("../json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
						return;
					} else if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
						message.reply("Self-assign wizard can only be run with a member that has Manage Server permission.");
						return;
					}
					message.reply(`Please read the following before proceeding.\n\`\`\`diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n+ This wizard cannot register 0800/0844 numbers. For registration on special numbers, dial *611.\n\`\`\`\nPlease enter the number you wish to enable in <#${message.channel.id}>. The number must start with \`${process.env.CPREFIX}\` followed by another 7 digits. Type \`0\` to quit the wizard.`);
					fouroneone.push({ user: message.author.id, status: "5" });
					fs.writeFileSync("../json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
				}
			}
		} else {
			message.reply(":x: Error: You already have a number in this channel. If you wish to edit or remove your number, dial `*611`.");
		}
	}
};
