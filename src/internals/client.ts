import { Client, ClientOptions, MessageEmbedOptions } from "discord.js";
import { Logger } from "winston";
import config from "../config/config";
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

	constructor(options: DTelClientOptions) {
		super(options);

		this.db = options.constantVariables.db;
		this.winston = options.constantVariables.winston;
	}

	errorEmbed(description: string, options?: MessageEmbedOptions): MessageEmbedOptions {
		return {
			color: config.colors.error,
			title: "❌ Error!",
			description,
			...options,
		};
	}

	warningEmbed(description: string, options?: MessageEmbedOptions): MessageEmbedOptions {
		return {
			color: 0xFFFF00,
			title: "❌ Error!",
			description,
			...options,
		};
	}
}

export default DTelClient;
