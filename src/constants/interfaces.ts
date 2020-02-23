import { Client } from "discord.js";
import databaseInterface from "../classes/cache";

export interface util {
	client: Client;
	db: databaseInterface;
}
