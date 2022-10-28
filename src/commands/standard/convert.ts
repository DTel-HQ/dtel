import Command from "../../internals/commandProcessor";
import discoin from "@discoin/scambio";

import auth from "../../config/auth";

const dClient = new discoin(auth.discoin.token, ["DTS"]);

export default class Convert extends Command {
	async run(): Promise<void> {
		
	}
}