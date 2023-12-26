import { ActiveCalls } from "@prisma/client";

export const buildTestCall = (details?: Partial<ActiveCalls>): ActiveCalls => ({
	id: "call_id",
	ended: null,
	fromNum: "03010000001",
	toNum: "03010000001",
	hold: {
		onHold: false,
		holdingSide: null,
	},
	pickedUp: {
		at: new Date("2024-01-01T15:35:18.705Z"),
		by: "user_id",
	},
	randomCall: false,
	started: {
		at: new Date("2024-01-01T14:35:18.705Z"),
		by: "user_id",
	},
	...details,
});
