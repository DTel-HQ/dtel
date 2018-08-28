const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async (client, message, args, callDocument) => {
    if (!callDocument) {
        return console.log("wtf no calldoc", callDocument);
    } else if (!callDocument.pickedUp) {
        return message.reply(":x: You can't transfer a pending call!");
    }
    let mynumber;
    try {
        mynumber = await Numbers.findOne({ _id: message.channel.id });
        if (!mynumber) {
            throw new Error();
        }
    } catch (err) {
        return message.reply("Own number not found, report this to `*611`");
    }
    let toDial = args;
    if (!toDial) {
        return message.reply(":thinking: Wanna transfer a call to void? How about `>hangup`?");
    }
    let toDialDocument;
    if (toDial && toDial.trim().toLowerCase() === "*rom") {
        toDial = "03017668976";
    }
    toDial = toDial.replace(/(a|b|c)/ig, "2").
        replace(/(d|e|f)/ig, "3").
        replace(/(g|h|i)/ig, "4").
        replace(/(j|k|l)/ig, "5").
        replace(/(m|n|o)/ig, "6").
        replace(/(p|q|r|s)/ig, "7").
        replace(/(t|u|v)/ig, "8").
        replace(/(w|x|y|z)/ig, "9").
        replace(/-/ig, "").
        replace("(", "").
        replace(")", "").
        replace(/\s+/g, "");
    if (toDial === mynumber.number) {
        return message.reply(":thinking: Why are you trying to transfer it to yourself?");
    }
    if (toDial === "*611") {
        if (message.channel.type !== "dm" && message.guild.id == process.env.SUPPORTGUILD) {
            return message.reply(":x: You are unable to call *611 here because Customer Support is literally at your doorstep.");
        } else {
            toDial = "08006113835";
        }
    }
    if (toDial === "*411" || toDial === "*233") {
        return message.reply("You can't transfer to `*411` or `*233`.");
    }
    try {
        toDialDocument = await Numbers.findOne({ number: toDial.trim() });
        if (!toDialDocument && toDial !== "*411" && toDial !== "*233") {
            throw new Error();
        }
    } catch (err) {
        return message.reply(":x: Dialing error: Requested number does not exist. Call `*411` to check numbers.");
    }
    if (toDialDocument.expired) {
        return message.reply(":x: Dialing error: The number you have dialed has expired. Please contact the number owner to renew it.");
    }
    if (toDialDocument && !client.api.channels(toDialDocument._id).get()) {
        return message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
    }
    if (toDialDocument._id === callDocument.from.channelID || toDialDocument._id === callDocument.to.channelID) {
        return message.reply(":thinking: You're in a call with that number right now!");
    }
    let dialedInCall;
    try {
        dialedInCall = await Calls.findOne({ "to.channelID": toDialDocument._id });
        if (!dialedInCall) {
            throw new Error();
        }
    } catch (err) {
        try {
            dialedInCall = await Calls.findOne({ "from.channelID": toDialDocument._id });
            if (!dialedInCall) {
                throw new Error();
            }
        } catch (err2) {
            // Ignore
        }
    }
    if (dialedInCall) {
        return message.reply(":x: Dialing error: The number you dialed is already in a call.");
    }
    if (toDial === "08006113835") {
        try {
            await client.apiSend(`<@&${process.env.SUPPORTROLE}>`, toDialDocument._id);
        } catch (err) {
            // Ignore
        }
    }
    // Error checking and utils finished! Let's actually start calling.
    message.reply(`:arrow_right: The other side has been transferred to \`${toDial}\`.`);
    await client.apiSend(`:arrow_right: A call in channel ${message.channel.id} has been transferred to ${toDialDocument._id} by __${message.author.tag}__ (${message.author.id}).`, process.env.LOGSCHANNEL);
    let toSend;
    callDocument.pickedUp = false;
    callDocument.onHold = false;
    if (callDocument.to.channelID === message.channel.id) {
        toSend = callDocument.from.channelID;
        await client.apiSend(`There is an incoming call (**Transferred** from \`${callDocument.to.number}\`) from \`${callDocument.from.number}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDocument._id);
        callDocument.transfer = true;
        callDocument.from = {channelID: callDocument.to._id, number: callDocument.to.number};
    } else {
        toSend = callDocument.to.channelID;
        await client.apiSend(`There is an incoming call (**Transferred** from \`${callDocument.from.number}\`) from \`${callDocument.to.number}\`. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, toDialDocument._id);
    }
    callDocument.to = {channelID: toDialDocument._id, number: toDialDocument.number};
    await client.apiSend(`:arrow_right: Your call has been transferred to \`${toDial}\`, awaiting pickup. You are able to \`>hangup\`.`, toSend);
    await callDocument.save();
    setTimeout(async () => {
        callDocument = await Calls.findOne({ _id: callDocument._id });
        if (callDocument && !callDocument.pickedUp) {
            message.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
            client.apiSend(":x: This call has expired (2 minutes).", callDocument.to.channelID);
            await callDocument.remove();
            client.apiSend(`:telephone: The call between channel ${callDocument.from.channelID} and channel ${callDocument.to.channelID} has expired.`, process.env.LOGSCHANNEL);
            let mailbox;
            try {
                mailbox = await Mailbox.findOne({ _id: toDialDocument._id });
                if (!mailbox) {
                    throw new Error();
                }
            } catch (err) {
                return client.apiSend(":x: Call ended; their mailbox hasn't been set up.", callDocument.from.channelID);
            }
            await client.apiSend(`:x: ${mailbox.settings.autoreply} \n:question: Would you like to leave a message? \`>message ${callDocument.to.number} [message]\``, callDocument.from.channelID);
            await OldCalls.create(new OldCalls(callDocument));
        }
    }, 120000);
};
