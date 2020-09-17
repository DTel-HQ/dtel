declare module "eris-sharder" {
	import { EventEmitter } from "events"
	import Eris from "eris"

	class Cluster {
        public shards: number;
        public maxShards: number;
        public firstShardID: number;
        public lastShardID: number;
        public mainFile: any;
        public clusterID: number;
        public clusterCount: number;
        public guilds: number;
        public users: number;
        public uptime: number;
        public exclusiveGuilds: number;
        public largeGuilds: number;
        public voiceChannels: number;
        public shardsStats: Array<any>;
        public app: any;
        public bot: Eris.Client | null;
        public test: boolean;

		constructor()

		logOverride(message: string): string

		spawn(): undefined

		connect(firstShardID: number, lastShardID: number, maxShards: number, token: string, type: any, clientOptions: Eris.ClientOptions): undefined
	
		loadCode(bot: Eris.Client): undefined

		startStats(bot: Eris.Client): undefined
	}

	export class Master extends EventEmitter {
		constructor(token: string, mainFile: string, options: {
			clientOptions: Eris.ClientOptions,
			shards?: number,
			firstShardID?: number,
			lastShardID?: number,
			clusters?: number,
			clusterTimeout?: number,
			stats?: boolean,
			statsInterval?: number,
			name?: string,
			guildsPerShard?: number,
			webhooks?: {
				cluster: any,
				shard: any
			},
			debug?: boolean
		})

		isMaster(): boolean;

		startStats(): undefined;

		executeStats(clusters: any, stat: number): undefined

		start(): number

		launch(test: any): number

		chunk(shards: any, clusterCount: number): any

		connectShards(): undefined

		sendWebhook(type: any, embed: any): undefined

		printLogo(): undefined

		restartCluster(worker: any, code: string, signal: any): undefined

		calculateShards(): Promise<any>

		fetchInfo(start: number, type: any, value: any): undefined 

		broadcast(start: number, message: string): undefined

		sendTo(cluster: Cluster, message: string): undefined
	}
	
	export class Base {
		constructor(setup: { bot: Eris.Client, clusterID: number })
		
		restartCluster(clusterID: number): undefined
	}
}