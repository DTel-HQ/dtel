import { buildPickupNotificationEmbed } from "@src/internals/calls/pickup/perform-pickup/messages/picked-up-notification/embed/BuildPickupNotificationEmbed";
import * as target from "./SendPickupNotificationEmbed";
import { EmbedBuilder } from "discord.js";
import { discordClientMock } from "@src/mocks/DiscordClient.test";

jest.mock("@src/internals/calls/pickup/messages/picked-up-notification/embed/BuildPickupNotificationEmbed");

const buildPickupNotificationEmbedMock = jest.mocked(buildPickupNotificationEmbed);
const embed = new EmbedBuilder();

let callId: string;

beforeEach(() => {
	buildPickupNotificationEmbedMock.mockReturnValue(embed);

	callId = "call_id";
});

it("should send the message", async() => {
	await target.sendPickupNotificationEmbed("channel_id", "en", callId);

	expect(buildPickupNotificationEmbedMock).toHaveBeenCalledWith("en", callId);
	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		embeds: [embed],
	}, "channel_id");
});
