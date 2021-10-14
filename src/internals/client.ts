import { Client, ClientOptions } from "discord.js";
import config from "../config/config";
import i18n from "./internationalization/i18n";


interface DTelClientOptions extends ClientOptions {
	// We'll need this for DB methinks
}

class DTelClient extends Client {
	config = config;

	constructor(options: DTelClientOptions) {
		super(options);

		this.config = config;
	}
}
