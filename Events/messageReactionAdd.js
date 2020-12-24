module.exports = async (mr, user) => {
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

    mr.message.channel.send(`:mrs_claus: You have entered the raffle <@${user.id}>, best of luck!`);
}
