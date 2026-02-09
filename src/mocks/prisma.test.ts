import { PrismaClient } from "@src/database/generated";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { db } from "@src/database/db";

jest.mock("@src/database/db", () => ({
	__esModule: true,
	db: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

// Ignore 'test suite has no tests' warning
test.skip("Workaround", () => { true; });
