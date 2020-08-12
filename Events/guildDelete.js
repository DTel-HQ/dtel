module.exports = async guild => {
	let name = guild.name;
	client.log(`:outbox_tray: Left guild \`${guild.id}\` (\`${name}\`). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}.`);
};
