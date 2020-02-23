import { channelMentionRegex, userMentionRegex, numberRegex } from "../constants/regexp";
import { SuffixTypes } from "../constants/enums";
import { Client } from "discord.js";
import { util } from "../constants/interfaces";
import databaseInterface from "../classes/cache";

interface suffixType {
	type: number;
	id: string | null;
}

/**
* Message and Suffix parser
* @param {util} util - the util object
* @constructor
*/

export default class Parser {
	protected client: Client;
	protected db: databaseInterface;

	constructor (protected util: util) {
		this.client = util.client;
		this.db = util.db;
	}

	/**
	* Check type of suffix content
	* @param s: string
	* @returns { type: number, ID: string? }
	* @public @static
	*/

	// Export the 'type' of suffix content and 'id' for mentions
	public static type(s: string): suffixType {
		if (!s || typeof s != "string") throw new Error("Parser(type): Suffix must be a defined string");
		else if (Number(s)) return { type: SuffixTypes["Number"], id: null };
		else if (s.length >= 25) return { type: SuffixTypes["text"], id: null };
		else if (userMentionRegex.exec(s)) return { type: SuffixTypes["userMention"], id: userMentionRegex.exec(s)![0] };
		else if (channelMentionRegex.exec(s)) return { type: SuffixTypes["channelMention"], id: channelMentionRegex.exec(s)![0] };
 		else if (numberRegex.exec(s)) return { type: SuffixTypes["DTelNumber"], id: null };
		return { type: SuffixTypes["text"], id: null };
	}

	/**
	* @todo will probably be an import from different util later on
	* returns an instance resolved from type and ID
	* @param id: string
	* @param type: number
	* @returns instance
	* @public
	*/

	public instance(id: string, type: number): any {
		if (type === SuffixTypes["DTelNumber"]) return ; // TODO: return number
		else if (type === SuffixTypes["userMention"]) return this.client.users.resolve(id);
		else if (type === SuffixTypes["channelMention"]) return this.client.channels.resolve(id);
		return null;
	}

	/**
	* Returns an array with suffix contents
	* @param suffix: string
	* @returns { content: content, type: typeNumber, id: ID?, instance: instance? }[]
	* @public
	*/

	public parseSuffix(suffix: string): object[] {
		const parsed: object[] = [];
		const suffixes: string[] = suffix.split(" ");

		let toParse: string,
			suffixType: suffixType,
			result: object = {};

		for (let step = 0; step < suffixes.length; step++) {
			toParse = suffixes[step];
			result = { ...result, content: toParse };
			suffixType = Parser.type(toParse);
			result = { ...result, ...suffixType };

			if (suffixType.type === SuffixTypes["text"]) {
				let text = suffix.split(" ").splice(step).join(" ");
				result = { ...result, content: text }
			}

			if (suffixType.id && suffixType.type) {
				this.instance(suffixType.id, suffixType.type).then((instance: any) => {
					result = { ...result, instance: instance };
				});
			}

			parsed.push(result);
		}

		return parsed;
	}
}
