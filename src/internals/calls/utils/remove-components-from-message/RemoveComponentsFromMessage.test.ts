import { discordClientMock } from "@src/mocks/DiscordClient.test";
import * as target from "./RemoveComponentsFromMessage";
import { APIMessage, ComponentType, MessageCreateOptions, RESTPatchAPIChannelMessageJSONBody } from "discord.js";

let channelId: string;
let messageId: string;

beforeEach(() => {
	channelId = "channel_id";
	messageId = "message_id";

	discordClientMock.rest.get.mockResolvedValue(<Partial<APIMessage>>{
		id: messageId,
		channel_id: channelId,
		embeds: [{
			title: "hello world",
		}],
		components: [{
			type: ComponentType.ActionRow,
			components: [],
		}],
	});
});

it("should remove the components from a message", async() => {
	await target.removeComponentsFromMessage(channelId, messageId);

	expect(discordClientMock.editCrossShard).toHaveBeenCalledWith(<MessageCreateOptions>{
		embeds: [{
			title: "hello world",
		}],
		components: [],
	}, channelId, messageId);
});
