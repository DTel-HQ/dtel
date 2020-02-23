import { NumberTypes } from "../constants/enums";
import { dmNumber, guildNumber } from "../constants/regexp";

/**
* Base number class
* @param {string} id - Number's ID
* @param {keyof typeof NumberTypes?} typename - Type of number
* @param {object?} data - Number's data
* @constructor
*/

export default class DTelNumber {
	readonly typename: keyof typeof NumberTypes;
	readonly type: number = NumberTypes[this.typename];

	constructor(readonly id: string, private _typename?: keyof typeof NumberTypes, protected data?: object) {
		if (this._typename) this.typename = this._typename;
		else this.typename = "DTelNumber";
	}

	public static type(id: string): number {
		if (guildNumber.exec(id)) return NumberTypes.DMNumber
		else if (dmNumber.exec(id)) return NumberTypes.GuildNumber
		else return -1;
	}
}
