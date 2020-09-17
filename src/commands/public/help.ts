import { Message } from "eris";
import Command from "command";
import { commandOptions, util } from "interfaces";

export default (util: util, msg: Message) => new Command(util, msg, opts, exec);

const opts = {
	command: "help",
	uperm: "default",
	nperm: "none"
} as commandOptions;

const exec: Function = () => {

};
