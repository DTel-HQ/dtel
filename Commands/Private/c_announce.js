const embed = {
    image: { url: "https://cdn.discordapp.com/attachments/393598647679582218/393956037637570560/DTel-chan.png", },
    color: 0x6e110b, 
    title: ":christmas_tree: **DTel's Christmas Giveaway** :christmas_tree:", 
    description:  "To celebrate the festive season, we're holding a special Christmas giveaway! \n\nTo enter, all you have to do is **react to this message with the :christmas_tree: emoji**. You will receive <:DTS:668551813317787659>**1000** and have a 5% chance at winning **2 months of VIP**!", 
    footer: { text: "The VIP raffle will end December 26th at 8pm UTC. Keep an eye out on your DMs and >balance." },
}

module.exports = async(bot, msg, arg) => {
    const omsg = await msg.channel.send({
        content: "preview",
        embed
    });
    await client.api.channels(omsg.channel.id).messages(omsg.id).reactions(encodeURIComponent("🎄"), "@me").put();

    const collected = (await msg.channel.awaitMessages(m => {
        m.author.id === msg.author.id;
    }), { max: 1, time: 3e4 }).first();
    if (!collected || collected.content !== "!!send") 
        return omsg.edit({ content: "aborted" });

    const numbers = await r.table("Numbers");
    const guilds = new Set();

    omsg.edit({ content: "sending..." });
    let time = process.hrtime();
    let err1 = 0;
    let err2 = 0;

    for (const number of numbers) {
        const channel = await bot.api.channels(number.channel).get().catch(_ => null);
        if (!channel) continue;

        const guildID = channel.guild_id;
        if (guildID && guilds.has(guildID)) continue;

        try {
            const sent = await client.apiSend({
                embed,
            }, channel.id);
            if (guildID) guilds.add(guildID);
            try {
                await client.api.channels(sent.channel_id).messages(sent.id).reactions(encodeURIComponent("🎄"), "@me").put();
            } catch (err) { err2++; }
        } catch(err) { err1++; }
    }

    time = process.hrtime(time);
    const sec = time[0];
	const h = Math.floor(sec / 3600);
	const m = Math.floor(sec / 60);
	const s = Math.round(sec - (m * 60));
    let t = await client.time(s, m, h);
    t += `${time[1]/1e6}ms`

    omsg.edit({ content: `Sent to ${guilds.size} servers in ${t}\nFailed messsages: ${err1}, failed reactions: ${err2}` });
}