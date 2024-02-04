import * as target from "./PickupInDb";
import { prismaMock } from "@src/mocks/prisma.test";

jest.useFakeTimers();
jest.setSystemTime(new Date());

it("should update the provided record in the db", async() => {
	await target.pickupInDb("call_id", "picked_up_by");

	expect(prismaMock.activeCalls.update).toHaveBeenCalledWith({
		where: {
			id: "call_id",
		},
		data: {
			pickedUp: {
				set: {
					at: new Date(),
					by: "picked_up_by",
				},
			},
		},
	});
});
