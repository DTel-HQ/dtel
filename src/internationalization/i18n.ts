import i18next from "i18next";
import English from "./data/english";
import { upperFirst } from "@src/internals/utils";

export const translations = {
	en: {
		translation: English,
	},
};

export const initInternationalization = () => {
	i18next.init({
		// debug: config.devMode,
		fallbackLng: "en",
		preload: ["en-US"],

		returnObjects: true,
		resources: translations,
	});

	i18next.services.formatter?.add("upperFirst", value => upperFirst(value));
};
