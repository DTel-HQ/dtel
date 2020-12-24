module.exports = async (mr, user) => {
    if (user.bot) return;
    if (mr.emoji.toString() !== "🎄") return;
    if (mr.message.author.id !== client.user.id) return;
    
    let account = await r.table("Accounts").get(user.id);
    if (!account) {
       account = {
           id: user.id,
           balance: 1000,
       }
       await r.table("Accounts").insert(account); 
    } else {
        if (account.CHRISTMASRAFFLE) return;
        const balance = account.balance + 1000;
        await r.table("Accounts").get(user.id).update({ CHRISTMASRAFFLE: true, balance });
    }

    mr.message.channel.send(`:mrs_claus: You have received <:DTS:668551813317787659>1000 and entered the raffle, best of luck and a merry Christmas <@${user.id}>!`);
}
