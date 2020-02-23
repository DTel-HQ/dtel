import { NumberTypes } from "../constants/enums";

export default class DTelNumber {
	readonly typename: keyof typeof NumberTypes;
	readonly type: number = NumberTypes[this.typename];

	constructor(readonly id: string, private _typename?: keyof typeof NumberTypes, protected data?: object) {
		if (this._typename) this.typename = this._typename;
		else this.typename = "DTelNumber";
	}
}
