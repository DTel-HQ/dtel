import mongoose, { Model } from "mongoose";
import auth from "../config/auth";

import callSchema, { DTelCall } from "./schemas/call";
import callMessagesSchema, { DTelCallMessage } from "./schemas/callMessages";
import numberSchema, { DTelNumber } from "./schemas/number";
interface DTelDatabase {
	calls: Model<DTelCall>,
	callMessages: Model<DTelCallMessage>,
	numbers: Model<DTelNumber>,
	oldCalls: Model<DTelCall>,
}

const init = (): DTelDatabase => {
	mongoose.connect(auth.mongodb.uri, { autoIndex: true });

	return {
		calls: mongoose.model<DTelCall>("Calls", callSchema),
		callMessages: mongoose.model<DTelCallMessage>("CallMessages", callMessagesSchema),
		numbers: mongoose.model<DTelNumber>("Numbers", numberSchema),
		oldCalls: mongoose.model<DTelCall>("OldCalls", callSchema), // Exists for DB performance reasons
	};
};

export default init;
export { DTelDatabase };

