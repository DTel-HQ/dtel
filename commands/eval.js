module.exports = async(bot, message, args)=>{
    // permission check
    if (!message.guild) return;
    if (!message.guild.roles.has("name", "Eval")) return;
    if (!message.member.hasRole(message.guild.roles.find("name", "Eval"))) return;
    if (args.length == 1){
        message.channel.send("You need to actually put an evaluation.");
        return;
    }
    // prevent anyone from getting the token
    const toEval = args.slice(1).join(" ");
    if (toEval.toLowerCase().contains("token")){
        message.channel.send(":x: Not allowed.");
        return;
    }
    try {
        const result = eval(toEval);
        // don't send it if it has the token.
        if (result.toString().contains(process.env.DISCORD_TOKEN)){
            message.channel.send(":x: Not allowed.");
            return;
        }
        var codeblock = "`";
        const resultType = typeof result;
        if (result.toString().length > 60) codeblock = "```";
        message.channel.send(`Evaluation success. Result: (type: ${resultType})\n${codeblock}${result.toString()}${codeblock}`)
    } catch (e) {
        message.channel.send("Your evaluation has failed. Check the console for more information.")
        console.error("Evaluation error: " + e.stack);
    }
};