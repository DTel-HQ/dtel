import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { EmbedBuilder } from "discord.js";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";

export const failedToStartCallEmbed = (from: CallParticipant): EmbedBuilder => {
	const translator = getCallTranslator(from.guild?.locale);
	const description = translator("errors.couldntReachOtherSide");

	return generateErrorEmbed(description);
};
