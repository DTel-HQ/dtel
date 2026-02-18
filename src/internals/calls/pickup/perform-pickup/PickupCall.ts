import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { pickupInDb } from "@src/internals/calls/pickup/perform-pickup/pickup-in-db/PickupInDb";

export const pickupCall = async(call: CallsWithNumbers, pickedUpBy: string): Promise<void> => {
	await pickupInDb(call, pickedUpBy);
};
