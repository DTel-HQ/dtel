import { ActiveCalls } from "@prisma/client";
import { pickupInDb } from "@src/internals/calls/pickup/pickup-in-db/PickupInDb";

export const pickupCall = async(call: ActiveCalls, pickedUpBy: string): Promise<void> => {
	await pickupInDb(call.id, pickedUpBy);


	// TODO: Propagate pickup to other side
};
