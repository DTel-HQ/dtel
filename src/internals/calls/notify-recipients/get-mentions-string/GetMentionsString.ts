import { Numbers } from "@src/database/generated";

export const getMentionsString = (mentions: Numbers["mentions"]): string => mentions.map(mention => idOrMentionToMention(mention)).join(" ");

const idOrMentionToMention = (input: string): string => {
	if (input.startsWith("<")) {
		return input;
	} else {
		return `<@${input}>`;
	}
};
