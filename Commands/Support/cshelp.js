module.exports = async(client, msg, suffix) => {
	let avatarURL = await client.user.displayAvatarURL();
	let toSend = {
		embed: {
			color: config.colors.info,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://dtel.austinhuang.me",
			},
			title: "List of Customer Support Commands",
			description: `For more information... actually read the [CS Documentation](${config.guidelink}), you dumbo.`,
			fields: [
				{
					name: "All commands",
					value: "addcredit, assign, backdoor, blacklist, broadcast, cshelp, deassign, minfo, ninfo, permcheck, reassign, rmstrike, strike, uinfo, unbusy, whitelist",
				},
				{
					name: ">broadcast (bc)",
					value: "When you want to communicate with a certain channel, but can't/don't want to call them.",
				},
				{
					name: ">deassign",
					value: "Use this when someone requests a number removal. Make sure they have the permission to request a removal! (`>permcheck`)\nWhen dealing with a VIP number you **must** use `>reassign`, if they want to move/edit their number.",
				},
				{
					name: ">minfo",
					value: "To get more information about a **mailbox message**.",
				},
				{
					name: ">permcheck (perm)",
					value: "When you need to know if someone may request a number removal, use this.",
				},
				{
					name: ">reassign",
					value: "You must use reassign, instead of deassign and assign, when dealing with a **VIP number**. You can change both the channel and number this way.",
				},
				{
					name: ">whitelist",
					value: "This is a manager+ command, servers that are whitelisted are allowed to have more than 3 numbers.",
				},
			],
			timestamp: new Date(),
			footer: {
				icon_url: "https://avatars1.githubusercontent.com/u/16656689",
				text: "DTel V3 - made with <3 by Austin Huang and his team",
			},
		},
	};

	let dmChannel = await msg.author.createDM();
	try {
		await msg.author.send(toSend);
	} catch (_) {
		await msg.channel.send(toSend);
	}
};
