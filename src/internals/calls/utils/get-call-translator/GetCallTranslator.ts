import { type TFunction, getFixedT } from "i18next";

export const getCallTranslator = (locale: string): TFunction => getFixedT(locale, undefined, "commands.call");
