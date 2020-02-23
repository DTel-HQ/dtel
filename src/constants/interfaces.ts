import { Client } from "discord.js";
import { Logger } from "winston";
import databaseInterface from "../classes/cache";

export interface util {
	client: Client;
	db: databaseInterface;
	logger: Logger;
}
