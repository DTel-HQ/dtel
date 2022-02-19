import mongoose, { Model } from "mongoose";
import numberSchema, { DTelNumber } from "./schemas/number";
import auth from "../config/auth";
interface DTelDatabase {
	numbers: Model<DTelNumber>,
}

const init = (): DTelDatabase => {
	mongoose.connect(auth.mongodb.uri, { autoIndex: true });

	return {
		numbers: mongoose.model<DTelNumber>("Numbers", numberSchema),
	};
};

export default init;
export { DTelDatabase };

