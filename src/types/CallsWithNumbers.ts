import {Numbers, ActiveCalls} from "@src/database/generated";


export type CallsWithNumbers = ActiveCalls & {
	to: Numbers;
	from: Numbers;
};
