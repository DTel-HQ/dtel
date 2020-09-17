import { Client } from "eris"
import { Logger } from "winston";

export default (constants: { client: Client, winston: Logger }) => {
	constants.winston.info("[Discord] Successfully connected to Discord.")
} 