const { exec } = require("child_process");
module.exports = async(client, msg, suffix) => {
  const perms = await client.permCheck(msg.author.id);
  if (perms.boss || ["139836912335716352", "124989722668957700"].contains(msg.author.id)) {
    await exec("git pull && pm2 restart 0");
    return msg.reply("Success... probably");
  }
};
