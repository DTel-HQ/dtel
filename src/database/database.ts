import mongoose, { Model } from "mongoose";
import numberSchema, { DTelNumber } from "./schemas/numbers";

interface DTelDatabase {
	mongoose: mongoose.Connection,
	numbers: Model<DTelNumber>,
}

export default (client): DTelDatabase => {
	
}
