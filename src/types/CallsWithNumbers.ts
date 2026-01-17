import { ActiveCalls, Numbers } from "@prisma/client";


export type CallsWithNumbers = ActiveCalls & {
	to: Numbers;
	from: Numbers;
};
