import { Message } from "discord.js";
import Command from "command";
import { util } from "interfaces";

export default (util: util, msg: Message) => new Command(util, msg, opts, exec);

const opts = {
	command: "help",
	uperm: "default",
	nperm: "none"
};

const exec: Function = () => {

};
