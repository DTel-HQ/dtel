import { ActiveCalls, GuildConfigs, Numbers } from "@prisma/client";
import { db } from "@src/database/db";

export type CallParticipant = Numbers & {
	incomingCalls: ActiveCalls[],
	outgoingCalls: ActiveCalls[],
	guild: GuildConfigs | null
};

interface getParticipantsFromNumbersReturnValue {
	to: CallParticipant | undefined,
	from: CallParticipant | undefined,
}

export const getParticipantsFromNumbers = async(toNum: string, fromNum: string): Promise<getParticipantsFromNumbersReturnValue> => {
	const participants = await db.numbers.findMany({
		where: {
			OR: [{
				number: toNum,
			}, {
				number: fromNum,
			}],
		},
		include: {
			incomingCalls: true,
			outgoingCalls: true,
			guild: true,
		},
	});

	const toDocument = participants.find(number => number.number === toNum);
	const fromDocument = participants.find(number => number.number === fromNum);

	return {
		to: toDocument,
		from: fromDocument,
	};
};
