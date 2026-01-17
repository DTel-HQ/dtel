import { createClient } from "redis";

export const redis = createClient({
	socket: {
		host: process.env.REDIS_HOST || "localhost",
		port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
	},
});

redis.connect().catch(error => {
	console.error("Failed to connect to Redis:", error);
	process.exit();
});
