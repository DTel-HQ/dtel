import { Client, ClientOptions } from "discord.js";
import { Logger } from "winston";
import config from "../config/config";
import Command from "../Interfaces/Command";
import { DTelDatabase } from "../database/database";
// import i18n from "./internationalization/i18n";


interface DTelClientOptions extends ClientOptions {
	constantVariables: {
		db: DTelDatabase,
		winston: Logger,
	}
}

class DTelClient extends Client {
	config = config;
	db: DTelDatabase;
	winston: Logger;

	commands: Command[] = [];

	constructor(options: DTelClientOptions) {
		super(options);

		this.db = options.constantVariables.db;
		this.winston = options.constantVariables.winston;
	}
}

export default DTelClient;
