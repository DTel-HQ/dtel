import { type TFunction, getFixedT } from "i18next";

export const getHangupTranslator = (locale?: string): TFunction => getFixedT(locale ?? "en", undefined, "commands.hangup");
