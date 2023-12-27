import { ActiveCalls, Numbers } from "@prisma/client";
import { calls } from "@src/instances/calls";

export const locallyCacheCall = (call: ActiveCalls, to: Numbers, from: Numbers) => calls.set(call.id, {
	...call,
	to,
	from,
});
