import * as djs from 'discord.js';
import { util } from 'interfaces';
import * as config from '../configuration/config'
import DTelUser from 'src/classes/dteluser';
import Account from 'src/classes/account';
import { aliases } from 'src/configuration/aliases';
import DTelChannel from 'src/classes/dtelchannel';
import DTelGuild from 'src/classes/dtelguild';
const reload = require('require-reload');

const callHandler = async (...args: any[])=>{//cmd: string, msg: Message, suffix: string, call: any) => {
    args[1] = '';
}

export default async (settings: util, msg: djs.Message) => {
    if(msg.author.bot || (config.settings.devOnlyMode && !config.ids.maintainers.includes(msg.author.id))) return;

    // fix messages (from 3.x code)
    msg.content = msg.content.replace(/^[\n‌]+$/igm, "").replace(/\s{5,}/m, "     ").replace(/^ +| +$/, "");

    const account: Account = (msg.author as DTelUser).account;
    const prefix = msg.content.startsWith(config.settings.prefix) ? config.settings.prefix : msg.content.startsWith(`<@${settings.client.user?.id}> `) ? `${settings.client.user?.id} ` : account.prefix;

    let cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix,"");
    if(typeof(aliases.get(cmd)) === 'string') cmd = (aliases.get(cmd) as string);
    const suffix = msg.content.split(' ').splice(1).join(" ").trim();

    const call = (msg.channel as DTelChannel).number ? await (msg.channel as DTelChannel).call : null;
    if(!call && !msg.content.startsWith(prefix)) return;

    let cmdFile;
    if(call && !msg.content.startsWith(prefix)) return (await callHandler(cmd, msg, suffix, call));

    if(call && msg.content.startsWith(prefix)) cmdFile = await reload(`./commands/call/${cmd}`);
    if(!cmdFile && (call && !call.hold)) return;

    if(!cmdFile) cmdFile = await reload(`./commands/public/${cmd}`);
    if(!cmdFile) {
        cmdFile = await reload(`./commands/support/${cmd}`);
        if(cmdFile && !(msg.author as DTelUser).support) return;
    };

    if(!cmdFile && config.ids.maintainers.includes(msg.author.id)) cmdFile = await reload(`./commands/private/${cmd}`);
    if(!cmdFile) return;
    if((msg.author as DTelUser).busy && !((msg.author as DTelUser).support && cmd == 'unbusy'))
        return msg.reply("Couldn't connect you, please close any previous menus (usually `0`)")

    // this is where i got lazy and just copied the entire thing

    let cooldown = await settings.db.cooldowns.r.table("Cooldowns").get(`${msg.author.id}-default`);
    if (cooldown && (cooldown).time > Date.now() && !(msg.author as DTelUser).support) return msg.channel.send({ embed: { color: config.colors.error, title: "Cooldown", description: `You're under cooldown for another ${settings.client.format(Math.ceil((cooldown.time - Date.now()) / 100) / 10)}s` } });
    // Add cooldown
    if (!(msg.author as DTelUser).support) (msg.author as DTelUser).cooldown = "default";
    // Run the command
    
    if (cmdFile) {
        // check for blacklist
        const userBlacklisted = await (msg.author as DTelUser).blacklisted;
        if (msg.guild && await (msg.guild as DTelGuild).blacklisted) {
            let name = msg.guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
            settings.logger.info(`📑 Left guild ${msg.guild.id}(${name}) for being on the blacklist. Currently in ${settings.client.guilds.cache.size} servers.`);
            return msg.guild.leave();
        }
        if (userBlacklisted) return;
    
        if (cmd !== "eval") settings.logger.info(`[${cmd}] ${msg.author.tag}(${msg.author.id}) => ${msg.content}`);
        try {
            await cmdFile(settings.client, msg, suffix, call);
            (msg.author as DTelUser).busy = false;
        } catch (err) {
            (msg.author as DTelUser).busy = false;
            msg.channel.send({
                embed: {
                    color: config.colors.error,
                    title: "❌ Error!",
                    description: `An unexpected error has occured.\n\`\`\`js\n${err.stack}\`\`\``,
                    footer: {
                        text: `Please contact a maintainer: https://discord.gg/RN7pxrB.`,
                    },
                },
            });
        }
    }
}