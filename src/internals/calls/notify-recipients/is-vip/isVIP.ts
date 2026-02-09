import { Numbers } from "@src/database/generated";

export const isVIP = (details: Numbers): boolean => details.vip ? details.vip.expiry > new Date() : false;
