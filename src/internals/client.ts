import { Client, ClientOptions, MessageEmbedOptions } from "discord.js";
import { REST } from "@discordjs/rest";
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

	restAPI: REST;

	constructor(options: DTelClientOptions) {
		super(options);

		this.db = options.constantVariables.db;
		this.winston = options.constantVariables.winston;

		this.restAPI = new REST();
		this.restAPI.setToken(this.token);
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

	// TODO: Convert to re2 somehow
	parseNumber(input: string): string {
		return input.replace(/(a|b|c)/ig, "2")
			.replace(/(d|e|f)/ig, "3")
			.replace(/(g|h|i)/ig, "4")
			.replace(/(j|k|l)/ig, "5")
			.replace(/(m|n|o)/ig, "6")
			.replace(/(p|q|r|s)/ig, "7")
			.replace(/(t|u|v)/ig, "8")
			.replace(/(w|x|y|z)/ig, "9")
			.replace(/-/ig, "")
			.replace(/("("|")")/ig, "")
			.replace(/\s+/g, "");
	}
}

export default DTelClient;
