import { getNumberLocale } from "@src/internals/utils/get-number-locale/GetNumberLocale";
import * as target from "./StartPickupTimer";
import { initInternationalization } from "@src/internationalization/i18n";
import { removeComponentsFromMessage } from "@src/internals/calls/utils/remove-components-from-message/RemoveComponentsFromMessage";
import { getCallById } from "@src/internals/calls/db/get-from-db-by-id/GetCallById";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { sendMissedCallMessageToSide } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/to/send-message/SendMissedCallMessageToSide";
import { sendMissedCallFromSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/send-message/SendMissedCallFromSideEmbed";

jest.useFakeTimers();
jest.mock("@src/internals/calls/get-from-db-by-id/GetCallById");
jest.mock("@src/internals/utils/get-number-locale/GetNumberLocale");
jest.mock("@src/internals/calls/utils/remove-components-from-message/RemoveComponentsFromMessage");
jest.mock("@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/to/send-message/SendMissedCallMessageToSide");
jest.mock("@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/send-message/SendMissedCallFromSideEmbed");

const setTimeoutSpy = jest.spyOn(global, "setTimeout");
const getCallByIdMock = jest.mocked(getCallById);
const getNumberLocaleMock = jest.mocked(getNumberLocale);
const removeComponentsFromMessageMock = jest.mocked(removeComponentsFromMessage);
const sendMissedCallMessageToSideMock = jest.mocked(sendMissedCallMessageToSide);
const sendMissedCallFromSideEmbedMock = jest.mocked(sendMissedCallFromSideEmbed);

let callId: string;
let notificationMessageId: string | undefined;

beforeEach(async() => {
	initInternationalization();

	callId = "call_id";
	notificationMessageId = "message_id";

	getNumberLocaleMock.mockResolvedValue("en");
	getCallByIdMock.mockResolvedValue({
		...buildTestCall({
			pickedUp: null,
		}),
		to: buildTestNumber(),
		from: buildTestNumber(),
	});
});

it("should create a 2 minute timeout", async() => {
	const anyFunction = expect.any(Function);
	const twoMinutes = 2 * 60 * 1000;

	await target.startPickupTimer(callId, notificationMessageId);

	expect(setTimeoutSpy).toHaveBeenCalledWith(anyFunction, twoMinutes);
});

const actOnTimerTimeoutFunc = () => target.onPickupTimerTimeout(callId, notificationMessageId);

describe("timer function tests", () => {
	it("should get both locales", async() => {
		await actOnTimerTimeoutFunc();

		expect(getNumberLocaleMock).toHaveBeenCalledTimes(2);
	});

	it("should remove components if there is a message id", async() => {
		await actOnTimerTimeoutFunc();

		expect(removeComponentsFromMessageMock).toHaveBeenCalled();
	});

	it("should not remove components if there is no message id", async() => {
		notificationMessageId = undefined;
		await actOnTimerTimeoutFunc();

		expect(removeComponentsFromMessageMock).not.toHaveBeenCalled();
	});

	it("should send the missed call message to the 'to' side", async() => {
		await actOnTimerTimeoutFunc();

		expect(sendMissedCallMessageToSideMock).toHaveBeenCalled();
	});

	it("should send the missed call message to the 'from' side", async() => {
		await actOnTimerTimeoutFunc();

		expect(sendMissedCallFromSideEmbedMock).toHaveBeenCalled();
	});
});

