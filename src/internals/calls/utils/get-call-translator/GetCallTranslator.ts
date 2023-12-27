import { type TFunction, getFixedT } from "i18next";

export const getCallTranslator = (locale?: string): TFunction => getFixedT(locale ?? "en", undefined, "commands.call");
