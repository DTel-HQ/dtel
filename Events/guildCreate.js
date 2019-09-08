module.exports = async guild => {
	client.log(`📥 Joined guild \`${guild.id}\`(${guild.name}). Currently in ${client.guilds.size} servers on shard ${client.shard.ids[0]}`);
};
