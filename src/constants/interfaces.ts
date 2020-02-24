import { Client } from "discord.js";
import { Logger } from "winston";
import DatabaseInterface from "../classes/cache";
import { UserPerms, NumberPerms } from "../constants/enums";

interface i18next {
	init: Function;
	t: Function;
}

export interface util {
	client: Client;
	db: DatabaseInterface;
	logger: Logger;
	t: i18next;
}

export interface commandOptions {
	command: string;
	uperm?: keyof typeof UserPerms;
	nperm?: keyof typeof NumberPerms;
	requirements?: object;
}
