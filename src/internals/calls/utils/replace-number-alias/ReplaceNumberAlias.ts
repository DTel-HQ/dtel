import config from "@src/config/config";

export const replaceNumberAlias = (number: string) => {
	if (number in config.aliasNumbers) return config.aliasNumbers[number as keyof typeof config.aliasNumbers];
	return number;
};
