// @ts-check
module.exports = async(client, msg) => {
    const participants = (await r.table("Accounts").filter({ CHRISTMASRAFFLE: true })).filter(a => !(a.support || a.manager || a.boss));

    const togive = participants.length * 0.05;

    for (let i = 0; i < togive; i++) {
        // get user
        const acc = participants.splice(Math.floor(Math.random()*participants.length), 1)[0];
        const user = await client.users.fetch(acc.id);

        // add vip
        await r.table("Accounts").get(acc.id).update({ vip: acc.vip+2 });

        // notify
        try {
            const dm = await user.createDM();
            dm.send({
                embed: {
                    color: 0x6e110b,
                    title: "Congratulations!",
                    description: `You are one of the ${Math.ceil(togive)} winners of 2 VIP months.\nYou can use them with the \`>upgrade\` command.\n\nHappy holidays!`,
                    image: { url: "https://cdn.discordapp.com/attachments/393598647679582218/393956037637570560/DTel-chan.png", },
                }
            });
        } catch(e) {
            msg.channel.send(acc.id);
        }
    }

    const support = (await r.table("Accounts").filter({ support: true })).filter(a => !a.boss);
    for (const acc of support) {
        // add vip
        await r.table("Accounts").get(acc.id).update({ vip: acc.vip+2 });

        // notify
        const user = await client.users.fetch(acc.id);
        try {
            const dm = await user.createDM();
            dm.send({
                embed: {
                    color: 0x6e110b,
                    title: "Thank you",
                    description: `Without you guys users wouldn't have a place to go for support.\nThat's why we have decided to gift all of you 2 VIP months.\n\nEnjoy the holidays!\n- DTel Management`,
                    image: { url: "https://cdn.discordapp.com/attachments/393598647679582218/393956037637570560/DTel-chan.png", },
                }
            });
        } catch(e) {
            msg.channel.send(acc.id);
        }
    }
    
    await r.table("Accounts").filter({ CHRISTMASRAFFLE: true }).replace(r.row.without("CHRISTMASRAFFLE"));
    msg.reply(`done: ${Math.ceil(togive)}•2 + ${support.length}•2 vips given away`);
};