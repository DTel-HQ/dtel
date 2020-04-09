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
	db: dbTables;
	logger: Logger;
	t?: i18next;
}

export interface dbTables {
	accounts: DatabaseInterface;
	blacklist: DatabaseInterface;
	calls: DatabaseInterface;
	cooldowns: DatabaseInterface;
	lottery: DatabaseInterface;
	mailbox: DatabaseInterface;
	numbers: DatabaseInterface;
	oldCalls: DatabaseInterface;
	phonebook: DatabaseInterface;
	strikes: DatabaseInterface;
	votes: DatabaseInterface;
	whitelist: DatabaseInterface;
	[index: string]: DatabaseInterface,
}

export interface commandOptions {
	command: string;
	uperm?: keyof typeof UserPerms;
	nperm?: keyof typeof NumberPerms;
	requirements?: object;
}
