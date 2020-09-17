declare module "eris-sharder" {
	import { EventEmitter } from "events"
	import Eris from "eris"

	class Cluster {
		id: null

		constructor()

		logOverride(message: string): string

		spawn(): undefined

		connect(firstShardID: number, lastShardID: number, maxShards: number, token: string, type: any, clientOptions: Eris.ClientOptions): undefined
	
		loadCode(bot: Eris.Client): undefined

		startStats(bot: Eris.Client): undefined
	}

	export class Master extends EventEmitter {
		constructor(token: string, mainFile: string, options: Eris.ClientOptions)

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