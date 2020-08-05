import { Message } from "discord.js";
import Command from "command";
import { util, commandOptions } from "interfaces";

export default (util: util, msg: Message) => new Command(util, msg, opts, exec);

const opts = {
	command: "help",
	uperm: "default",
	nperm: "none"
} as commandOptions;

const exec: Function = () => {

};
