import * as target from "./HangupInDb";
import { prismaMock } from "@src/mocks/prisma.test";

jest.useFakeTimers();
jest.setSystemTime(new Date());

it("should update the provided record in the db", async() => {
	await target.hangupInDb("call_id", "hung_up_by");

	expect(prismaMock.activeCalls.update).toHaveBeenCalledWith({
		where: {
			id: "call_id",
		},
		data: {
			ended: {
				set: {
					at: new Date(),
					by: "hung_up_by",
				},
			},
		},
	});
});
