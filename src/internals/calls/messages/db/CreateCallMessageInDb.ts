import { CallMessages } from "@prisma/client";
import { db } from "@src/database/db";
import { callMessages } from "@src/instances/calls";

type createCallMessageOptions = Omit<CallMessages, "id" | "sentAt">;

// TODO: Test after mongodb testing set up
export const createCallMessageInDb = async(options: createCallMessageOptions) => {
	const message = await db.callMessages.create({
		data: {
			...options,
			sentAt: new Date(),
		},
	});


	// TODO: Pull out and test
	const messagesInThisCall = callMessages.filter(m => m.callID === options.callID);
	if (messagesInThisCall.size >= 20) {
		const firstCachedMessage = messagesInThisCall.first();
		if (!firstCachedMessage) return;

		callMessages.delete(firstCachedMessage.id);
	}

	callMessages.set(message.id, message);
};
