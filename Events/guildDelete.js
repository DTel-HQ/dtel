module.exports = async guild => {
	let name = guild.name.replace("`", "");
	client.log(`:outbox_tray: Left guild \`${guild.id}\` (\`${name}\`). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}.`);
};
