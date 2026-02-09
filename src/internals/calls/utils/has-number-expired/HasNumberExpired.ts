import { Numbers } from "@src/database/generated";

export const hasNumberExpired = (number: Numbers) => number.expiry < new Date();
