import { CallMessages } from "@src/database/generated";
import { db } from "@src/database/db";
import { callMessagesCache } from "@src/instances/calls";

type createCallMessageOptions = Omit<CallMessages, "id" | "sentAt">;

export const createCallMessageInDb = async(options: createCallMessageOptions) => {
	const message = await db.callMessages.create({
		data: {
			...options,
			sentAt: new Date(),
		},
	});


	const messagesInThisCall = callMessagesCache.filter(m => m.callID === options.callID);
	if (messagesInThisCall.size >= 20) {
		const firstCachedMessage = messagesInThisCall.first();
		if (!firstCachedMessage) return;

		callMessagesCache.delete(firstCachedMessage.id);
	}

	callMessagesCache.set(message.id, message);
};
