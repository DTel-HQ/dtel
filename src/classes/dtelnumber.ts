import { NumberType } from "../constants/enums";

export default class DTelNumber {
	constructor(readonly id: string, readonly typename?: string, protected data?: object) {
		if (!typename) this.typename = "DTelNumber";
	}

	readonly type: number = NumberType[this.typename];
}
