import { ActiveCalls } from "@prisma/client";
import { client } from "@src/instances/client";

export const sendCallToOtherShard = async(shardID: number, call: ActiveCalls): Promise<void> => {
	// THIS CAN THROW callNotFound

	// TODO: Revisit the sending system and unit test
	await client.shard!.send({
		msg: "callInitiated",
		callDBObject: call,
	});


	// await client.shard!.broadcastEval<void, ctx>(async(_client: Client, context: ctx): Promise<void> => {
	// 	const client = _client as DTelClient;
	// 	calls.set(context.callID, await require(context.fileLocation).default.byID(client, {
	// 		id: context.callID,
	// 		side: "to",
	// 	}));
	// }, {
	// 	shard: this.otherSideShardID,
	// 	context: {
	// 		callID: this.id,
	// 		fileLocation: thisFile,
	// 	},
	// });
};
