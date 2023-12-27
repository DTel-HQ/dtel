import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./MissedCallFromSideButtons";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Mailbox, Numbers } from "@prisma/client";
import { buildTestMailbox } from "@src/internals/mailbox/build-test-mailbox/BuildTestMailbox";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

let mailbox: Mailbox;
let to: Numbers;

beforeEach(() => {
	initInternationalization();

	mailbox = buildTestMailbox({
		number: "03010000001",
	});
	to = buildTestNumber({
		number: "03010000001",
	});
});

describe("action row generation test", () => {
	let actionRow: ActionRowBuilder<ButtonBuilder> | undefined;

	describe("mailbox can receive", () => {
		beforeEach(() => {
			mailbox.receiving = true;

			actionRow = target.missedCallFromSideButtons(to, mailbox, "en");
		});

		it("should have an action button", () => {
			expect(actionRow).not.toBeUndefined();
		});

		it("should have a button", () => {
			expect(actionRow?.components).toHaveLength(1);
		});

		it("should have a pick up button on the action row", () => {
			const pickupButton = (actionRow!.components[0] as ButtonBuilder).data;

			expect(pickupButton.type).toStrictEqual(ComponentType.Button);
			expect(pickupButton.label).toStrictEqual("Send Message");
			expect(pickupButton.style).toStrictEqual(ButtonStyle.Primary);
			expect(pickupButton.emoji).toStrictEqual({
				name: "📬",
			});
		});
	});

	describe("mailbox cannot receive", () => {
		beforeEach(() => {
			mailbox.receiving = false;

			actionRow = target.missedCallFromSideButtons(to, mailbox, "en");
		});

		it("should not return an action row", () => {
			expect(actionRow).toBeUndefined;
		});
	});
});
