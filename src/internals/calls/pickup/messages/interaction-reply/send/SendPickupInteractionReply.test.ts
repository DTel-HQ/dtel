import * as target from "./SendPickupInteractionReply";
import { EmbedBuilder, MessageComponentInteraction } from "discord.js";
import { buildPickupInteractionReplyEmbed } from "@src/internals/calls/pickup/messages/interaction-reply/embed/PickupInteractionReplyEmbed";

jest.mock("@src/internals/calls/pickup/messages/interaction-reply/embed/PickupInteractionReplyEmbed");

const buildPickupInteractionReplyEmbedMock = jest.mocked(buildPickupInteractionReplyEmbed);
const interactionReplyMock = jest.fn();

let interaction: MessageComponentInteraction;
let callId: string;

beforeEach(() => {
	buildPickupInteractionReplyEmbedMock.mockReturnValue(new EmbedBuilder());

	interaction = {
		locale: "en",
	} as unknown as MessageComponentInteraction;
	interaction.reply = interactionReplyMock;
	callId = "call_id";
});

it("should send the message", async() => {
	await target.sendPickupInteractionReply(interaction, callId);

	expect(buildPickupInteractionReplyEmbedMock).toHaveBeenCalledWith(interaction.locale, callId);
	expect(interactionReplyMock).toHaveBeenCalled();
});
