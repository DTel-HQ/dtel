// @ts-check
module.exports = async(client, msg, suffix) => {
    if (!suffix || !["head", "tails"].includes(suffix.split(" ")[0].toLowerCase())) return msg.channel.send({ embed: { color: config.colors.info, description: "Are you confident in your guessing skills? Then ~~waste~~ win some money with coinflip!\nUsage: `>coinflip [head|tails] [amount]`" } });

    const type = suffix.split(" ")[0].toLowerCase() === "head" ? 0 : 1;
    let bet = parseInt(suffix.split(" ")[1]);

    if (!bet) return msg.channel.send({ embed: { color: config.colors.info, description: "We're not playing for free... `>bet [amount]`" } });
    
    if (bet > 250) {
        msg.channel.send("Hoho, you may be rich but the maximum betting amount is <:DTS:668551813317787659>250. I've lowered it for you.");
        bet = 250;
    }

    const side = Math.random() < .5 ? 0 : 1;
    const color = config.colors.lottery;

    return msg.channel.send({ embed: { color, description: "Flipping the coin..." } }).then(async(m) => {
        const balance = (await msg.author.account()).balance + ((side === type ? .5 : -1) * bet)
        await r.table("Accounts").get(msg.author.id).update({ balance });
        const title = `Landed on...`
        const description = type === side ? 
            `Congratulations! You've won <:DTS:668551813317787659>${bet * .5}`
            : `Thanks for your credits, I'll be ~~gambling~~ spending them well!`;

        setTimeout(() => {
            m.edit({ embed: { title, description, color } });
        }, 4500);
    }); 
};
