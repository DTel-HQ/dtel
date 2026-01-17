import { Numbers } from "@prisma/client";

export const hasNumberExpired = (number: Numbers) => number.expiry < new Date();
