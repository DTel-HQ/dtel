import { Mailbox, Numbers } from "@prisma/client";
import * as target from "./SendMissedCallFromSideEmbed";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { buildTestMailbox } from "@src/internals/mailbox/build-test-mailbox/BuildTestMailbox";
import { initInternationalization } from "@src/internationalization/i18n";
import { getMailboxByNumber } from "@src/internals/mailbox/get-from-db-by-number/GetMailboxByNumber";
import { missedCallFromSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/MissedCallFromSideEmbed";
import { APIMessage, ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { missedCallFromSideButtons } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/components/MissedCallFromSideButtons";
import { generateMailboxField } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/generate-mailbox-field/GenerateMailboxField";
import { discordClientMock } from "@src/mocks/DiscordClient.test";

jest.mock("@src/internals/mailbox/get-from-db-by-number/GetMailboxByNumber");
jest.mock("@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/MissedCallFromSideEmbed");
jest.mock("@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/components/MissedCallFromSideButtons");
jest.mock("@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/generate-mailbox-field/GenerateMailboxField");

const missedCallFromSideEmbedMock = jest.mocked(missedCallFromSideEmbed);
const getMailboxByNumberMock = jest.mocked(getMailboxByNumber);
const missedCallFromSideButtonsMock = jest.mocked(missedCallFromSideButtons);
const generateMailboxFieldMock = jest.mocked(generateMailboxField);

let mailbox: Mailbox;
let to: Numbers;
let from: Numbers;

const embedMock = new EmbedBuilder();
const embedFields = [{
	name: "test_name",
	value: "test_val",
	inline: true,
}];
const actionRowMock = new ActionRowBuilder<ButtonBuilder>();

beforeEach(() => {
	missedCallFromSideEmbedMock.mockReturnValue(embedMock);

	initInternationalization();
	getMailboxByNumber;

	mailbox = buildTestMailbox({
		number: "03010000001",
	});
	to = buildTestNumber({
		number: "03010000001",
	});
	from = buildTestNumber({
		number: "03010000002",
	});

	getMailboxByNumberMock.mockResolvedValue(mailbox);
	missedCallFromSideButtonsMock.mockReturnValue(actionRowMock);
	generateMailboxFieldMock.mockResolvedValue(embedFields);
	discordClientMock.sendCrossShard.mockResolvedValue("mock_return" as unknown as APIMessage);
});

it("should send the embed with no components if no mailbox", async() => {
	getMailboxByNumberMock.mockResolvedValue(null);

	const result = await target.sendMissedCallFromSideEmbed({
		from,
		to,
		fromLocale: "en",
	});

	expect(getMailboxByNumberMock).toHaveBeenCalled();
	expect(missedCallFromSideEmbedMock).toHaveBeenCalled();

	expect(missedCallFromSideButtonsMock).not.toHaveBeenCalled();
	expect(generateMailboxFieldMock).not.toHaveBeenCalled();

	expect(result).toStrictEqual("mock_return");
	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		embeds: [embedMock],
		components: undefined,
	}, from.channelID);
});

it("should send the embed with components if a mailbox is present", async() => {
	const result = await target.sendMissedCallFromSideEmbed({
		from,
		to,
		fromLocale: "en",
	});


	expect(getMailboxByNumberMock).toHaveBeenCalled();
	expect(missedCallFromSideEmbedMock).toHaveBeenCalled();

	expect(missedCallFromSideButtonsMock).toHaveBeenCalled();
	expect(generateMailboxFieldMock).toHaveBeenCalled();

	expect(result).toStrictEqual("mock_return");
	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		embeds: [embedMock],
		components: [actionRowMock],
	}, from.channelID);
});
