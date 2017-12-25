exports.run = async(bot, message, args)=>{
    // permission check
    if (!bot.guilds.get("281815661317980160").members.get("").hasRole(message.guild.roles.find("name", "Boss"))) return;
    if (args.length == 1){
        message.channel.send("You need to actually put an evaluation.");
        return;
    }
    // prevent anyone from getting the token
    const toEval = args.slice(1).join(" ");
    if (toEval.toLowerCase().contains("token")){
        message.channel.send(":x: no u");
        return;
    }
    try {
        const result = eval(toEval);
        // don't send it if it has the token.
        if (result.toString().contains(process.env.DISCORD_TOKEN)){
            message.channel.send(":x: **DID YOU JUST TRY TO BETRAY OUR SOVIET MOTHERLAND???**");
            return;
        }
        const resultType = typeof result;
        message.channel.send(`Great success! Result: (type: ${resultType})\n\`\`\`js\n${result.toString()}\n\`\`\``)
    } catch (e) {
        message.channel.send("Evaluation oof: \n```js\n" + e.stack + "\n```");
    }
};
