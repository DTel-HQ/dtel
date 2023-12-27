import { ActiveCalls } from "@prisma/client";
import { winston } from "@src/instances/winston";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { isThisShardID } from "@src/internals/utils/IsThisShardID";
import { sendCallToOtherShard } from "./send-call-to-other-shard/SendCallToOtherShard";
import { shardIdForChannelId } from "./utils/ShardIdForChannelId";
import { startPickupTimer } from "@src/internals/calls/propagate/start-pickup-timer/StartPickupTimer";

export const propagateCall = async(call: ActiveCalls, to: CallParticipant, notificationMessageID: string) => {
	const eventReceivingOtherSideShardID = await shardIdForChannelId(to.channelID).catch(() => null);
	if (eventReceivingOtherSideShardID === null) throw new Error("otherSideMissingChannel");

	winston.debug(`Other side is: ${eventReceivingOtherSideShardID}`);

	if (isThisShardID(eventReceivingOtherSideShardID)) {
		startPickupTimer(call.id, notificationMessageID);
		return;
	}

	return sendCallToOtherShard(eventReceivingOtherSideShardID, call);
};
