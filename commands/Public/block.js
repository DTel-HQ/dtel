module.exports = async(client, msg, suffix) => {
	let toBlock = await suffix.join('').replace(/[-\s]/g, ''); // Help users a bit by removing spaces & '-'
  let myNumber = await r.table("Numbers")
    .getAll(msg.channel.id, { index: "channel" })
    .nth(0)
    .default(null);
  let perm = await msg.guild.members.get(msg.author.id).hasPermission('MANAGE_GUILD')

  if (!myNumber) {
    msg.reply("This channel doesn't have a number.");
  } else if (!perm) {
    msg.reply("You need manage server permissions to do this.");
  } else if (!toBlock) {
    msg.reply("To block a number from calling you: `>block [number]`");
  } else if (!toBlock.match(/^0[39]0[0-9]{8}$/)) { // only 11numb long 030* and 0900 numbers allowed
    msg.reply("Incorrect number. You can't block special numbers. Please report any abuse by calling `*611`");
  } else {
    let number = r.table("Numbers").get(toBlock);
    if (!number) {
      msg.reply("That number could not be found.");
    } else {
      let blocked = myNumber.blocked || [];
      blocked.push(toBlock);
      r.table("Numbers").get(myNumber.id).update({ blocked: blocked }).run(conn, (err, cursor) => {
        if (err) {
          winston.info(`[RethinkDB] Couldn't update blocked on number ${myNumber.id}: ${err}`);
          msg.reply("Something went wrong, please try again later.");
        } else {
          msg.reply(`Succesfully blocked ${toBlock}`);
        }
      });
    }
  }
};
