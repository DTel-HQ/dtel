import mongoose, { Model } from "mongoose";
import numberSchema, { DTelNumber } from "./schemas/number";
import callSchema, { DTelCall } from "./schemas/call";
import auth from "../config/auth";
interface DTelDatabase {
	numbers: Model<DTelNumber>,
	calls: Model<DTelCall>,
}

const init = (): DTelDatabase => {
	mongoose.connect(auth.mongodb.uri, { autoIndex: true });

	return {
		numbers: mongoose.model<DTelNumber>("Numbers", numberSchema),
		calls: mongoose.model<DTelCall>("Calls", callSchema),
	};
};

export default init;
export { DTelDatabase };

