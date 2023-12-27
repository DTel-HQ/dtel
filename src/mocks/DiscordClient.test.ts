import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import DTelClient from "@src/internals/client";

import { client } from "@src/instances/client";

jest.mock("@src/instances/client", () => ({
	__esModule: true,
	client: mockDeep<DTelClient>(),
}));

beforeEach(() => {
	mockReset(discordClientMock);
});

export const discordClientMock = client as unknown as DeepMockProxy<DTelClient>;
