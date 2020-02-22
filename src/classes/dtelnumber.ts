import { NumberTypes } from "../constants/enums";

export default class DTelNumber {
	constructor(readonly id: string, readonly typename: string | null, protected data?: object) {
		if (!typename) this.typename = "DTelNumber";
	}

	readonly type: number = NumberTypes[this.typename];
}
