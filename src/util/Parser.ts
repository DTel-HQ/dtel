import { channelMentionRegex, userMentionRegex, numberRegex } from "../constants/regexp";
import { SuffixTypes } from "../constants/enums";
import { Client } from "discord.js";

interface suffixType {
	type: number;
	id: string | null;
}

export default class Parser {
	constructor (protected client: Client) {
	}

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

	public object(id: string, type: number): any {
		if (type === SuffixTypes["DTelNumber"]) return ; // TODO: return number
		else if (type === SuffixTypes["userMention"]) return this.client.users.resolve(id);
		else if (type === SuffixTypes["channelMention"]) return this.client.channels.resolve(id);
	}

	public parseSuffix(suffix: string): object[] {
		const parsed: object[] = [];
		const suffixes: string[] = suffix.split(" ");

		let toParse: string,
			suffixType: suffixType,
			suffixObject: object,
			result: object = {};

		for (let step = 0; step < suffixes.length; step++) {
			toParse = suffixes[step];
			suffixType = Parser.type(toParse);
			result = { ...result, ...suffixType };

			if (suffixType.type === SuffixTypes["text"]) {
				let text = suffix.split(" ").splice(step).join(" ");
				result = { ...result, text: text }
			}

			if (suffixType.id && suffixType.type) {
				this.object(suffixType.id, suffixType.type).then((object: any) => {
					suffixObject = object;
					result = { ...result, ...suffixObject };
				});
			}

			parsed.push(result);
		}

		return parsed;
	}
}
