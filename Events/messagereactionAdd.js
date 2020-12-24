module.exports = async (mr, user) => {
    if (`${mr.emoji}` !== "🎄") return;
    if (mr.message.author.id !== client.user.id) return;

    if (user.id !== "124989722668957700") return;
    else return mr.message.channel.send("seen");
    
    let account = await r.table("Accounts").get(user.id);
    if (!account) {
       account = {
           id: user.id,
           balance: 0,
       }
       await r.table("Accounts").insert(account); 
    } else {
        await r.table("Accounts").get(user.id).update({ CHRISTMASRAFFLE: true });
    }

    mr.message.channel.send(`:mrs_claus: You have entered the raffle <@${user.id}>, best of luck!`);
}