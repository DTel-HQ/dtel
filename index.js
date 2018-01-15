// First, the uptime-o-tron
require("dotenv").config();
const ipaddress = process.env.IP || "127.0.0.1";
const http = require("http");
const port = process.env.PORT || 2000;
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("ok");
});
server.listen(port, ipaddress, () => {
	console.log(`Bot HTTP Server listeing on ${ipaddress}:${port}`);
});

// Then, the sharder

const { ShardingManager } = require("discord.js");
const manager = new ShardingManager(`${__dirname}/botfiles.js`, { totalShards: 1, token: process.env.DISCORD_TOKEN });

manager.spawn();
manager.on("shardCreate", shard => console.log(`Successfully launched shard ${shard.id}`));
