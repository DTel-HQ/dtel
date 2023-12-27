import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./NotificationMessageButtons";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

beforeEach(() => {
	initInternationalization();
});

describe("action row generation test", () => {
	let actionRow: ActionRowBuilder;
	beforeEach(() => {
		actionRow = target.generateNotificationMessageButtons(buildTestParticipant());
		expect(actionRow.components).toHaveLength(2);
	});

	it("should have a pickup button", () => {
		const pickupButton = (actionRow.components[0] as ButtonBuilder).data;

		expect(pickupButton.type).toStrictEqual(ComponentType.Button);
		expect(pickupButton.label).toStrictEqual("Pick up");
		expect(pickupButton.style).toStrictEqual(ButtonStyle.Primary);
		expect(pickupButton.emoji).toStrictEqual({
			name: "📞",
			id: undefined,
			animated: false,
		});
	});

	it("should have a hangup button", () => {
		const pickupButton = (actionRow.components[1] as ButtonBuilder).data;

		expect(pickupButton.type).toStrictEqual(ComponentType.Button);
		expect(pickupButton.label).toStrictEqual("Hang up");
		expect(pickupButton.style).toStrictEqual(ButtonStyle.Secondary);
		expect(pickupButton.emoji).toStrictEqual({
			name: "☎️",
			id: undefined,
			animated: false,
		});
	});
});
