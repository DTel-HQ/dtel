import { Numbers } from "@prisma/client";

export const isVIP = (details: Numbers): boolean => details.vip ? details.vip.expiry > new Date() : false;
