import { Message } from "discord.js";
import { util, commandOptions } from "../constants/interfaces";

/**
* Base structure for all commands
* @param {util} util - util object
* @param {Message} msg - iniatiating Message
* @param {commandOptions} opts - commandoptions
* @param {Function} exec - The function to execute
* @constructor
*/

export default class Command {
	readonly opts: commandOptions = {
		command: "",
		uperm: undefined,
		nperm: undefined,
		requirements: {},
	}

	constructor(protected util: util, protected msg: Message, opts: commandOptions, protected exec: Function ) {
		Object.assign(this.opts, opts);
	}

	public execute(): unknown {
		return this.exec();
	}
}
