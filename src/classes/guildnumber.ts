import DTelNumber from "./dtelnumber";

export default class GuildNumber extends DTelNumber {
	constructor(id: string, data?: object) {
		super(id, "GuildNumber", data)
	}
}
