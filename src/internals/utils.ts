/* eslint-disable arrow-body-style */
// Stuff that's too specific to but put on the client, but still used in multiple places

import { Accounts, Numbers } from "@prisma/client";
import dayjs from "dayjs";
import { db } from "@src/database/db";
import { User } from "discord.js";
import { parseNumber as parseNumberFunc } from "@src/internals/calls/utils/parse-number/ParseNumber";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const parseNumber = parseNumberFunc;

export const formatShardNumber = (shardNumber: number): string => shardNumber < 10 ? `0${shardNumber}` : shardNumber.toString();
export const formatBalance = (balance: number): string => {
	// For Discoin decimal compatibility
	const roundedBal = Math.round(balance * 100) / 100;

	// Adds 0s to decimal values
	// eslint-disable-next-line @typescript-eslint/no-extra-parens
	return roundedBal.toLocaleString("en-US", { minimumFractionDigits: (roundedBal % 1 < 0) ? 2 : 0 });
};

export const getAccount = async(id: string): Promise<Accounts | null> => {
	return db.accounts.findUnique({
		where: {
			id,
		},
	});
};

export const getOrCreateAccount = async(id: string): Promise<Accounts> => {
	let account = await getAccount(id);

	if (!account) {
		account = await db.accounts.create({
			data: {
				id,
			},
		});
	}

	// We can be sure there's an account here
	return account!;
};

export const randomString = (length: number): string => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const fetchNumber = (input: string): Promise<Numbers | null> => {
	return db.numbers.findUnique({
		where: {
			number: input.length === 11 ? input : undefined,
			channelID: input.length > 11 ? input : undefined,
		},
	});
};

export const formatDate = (date: Date) => dayjs(date).format("YYYY-MM-DD");
export const upperFirst = (text: string) => `${text[0].toUpperCase()}${text.slice(1, text.length)}`;

export const getUsername = (user: User) => {
	if (user.discriminator == "0") return `${user.username}`;
	return `${user.username}#${user.discriminator}}`;
};
