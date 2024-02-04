import { ActiveCalls } from "@prisma/client";
import { locallyCacheCall } from "@src/internals/calls/locally-cache-call/LocallyCacheCall";
import { notifyCallRecipients } from "@src/internals/calls/notify-recipients/NotifyCallRecipients";
import { sendFailedToStartCall } from "@src/internals/calls/notify-recipients/message-payload/failed-to-start-call/send-embed/SendFailedToStartCall";
import { endMissedCallInDb } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/end-call/in-db/EndMissedCallInDb";
import { generateUUID } from "@src/internals/utils/generateUUID";
import { createCallInDb } from "./db/create-in-db/CreateInDb";
import { propagateCall } from "./propagate/Propagate";
import { getParticipantsFromNumbers } from "./utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { hasNumberExpired } from "./utils/has-number-expired/HasNumberExpired";
import { isParticipantInCall } from "./utils/is-participant-in-call/IsParticipantInCall";
import { parseNumber } from "./utils/parse-number/ParseNumber";
import { replaceNumberAlias } from "./utils/replace-number-alias/ReplaceNumberAlias";

export interface CallInitiationParams {
	toNum: string,
	fromNum: string,
	isRandom: boolean,
	startedBy: string
}

export const initiateCall = async({
	toNum,
	fromNum,
	startedBy,
	isRandom = false,
}: CallInitiationParams): Promise<ActiveCalls> => {
	const numberToCall = replaceNumberAlias(parseNumber(toNum));
	const callOriginNumber = replaceNumberAlias(parseNumber(fromNum));

	if (numberToCall.length !== 11) throw new Error("numberInvalid");
	if (callOriginNumber.length !== 11) throw new Error("invalidInitializer");

	if (numberToCall === callOriginNumber) throw new Error("callingSelf");

	const participants = await getParticipantsFromNumbers(numberToCall, callOriginNumber);

	const dbCallSender = participants.from;
	if (!dbCallSender) throw new Error("invalidFrom");
	if (hasNumberExpired(dbCallSender)) throw new Error("thisSideExpired");

	const dbCallRecipient = participants.to;
	if (!dbCallRecipient) throw new Error("otherSideNotFound");
	if (hasNumberExpired(dbCallRecipient)) throw new Error("otherSideExpired");
	if (dbCallRecipient.blocked.includes(dbCallSender.number)) throw new Error("otherSideBlockedYou");
	if (isParticipantInCall(dbCallRecipient)) throw new Error("otherSideInCall");

	const callInDb = await createCallInDb({
		id: generateUUID(),
		toNum: dbCallRecipient.number,
		fromNum: dbCallSender.number,
		randomCall: isRandom,
		started: {
			at: new Date(),
			by: startedBy,
		},
	});

	await locallyCacheCall(callInDb, dbCallRecipient, dbCallSender);

	let notificationMessageId: string;

	try {
		notificationMessageId = await notifyCallRecipients(callInDb, dbCallRecipient, dbCallSender);
	} catch (err) {
		await sendFailedToStartCall(dbCallSender).catch(() => undefined);
		await endMissedCallInDb(callInDb);

		throw new Error("couldntReachOtherSide");
	}

	await propagateCall(callInDb, dbCallRecipient, notificationMessageId);

	// TODO: Propagate call

	// TODO: Pickup timer

	return callInDb;
};
