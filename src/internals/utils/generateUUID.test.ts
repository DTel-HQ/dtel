import * as target from "./generateUUID";

it("should return a uuid", () => {
	const uuid = target.generateUUID();

	const matches = uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
	expect(matches).toHaveLength(1);
});
