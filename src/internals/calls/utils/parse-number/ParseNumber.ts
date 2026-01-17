// We should move this to RE2 if someone can do it well
// safe-regex says these are ok
export const parseNumber = (input: string): string => input
	.replace(/(a|b|c)/ig, "2")
	.replace(/(d|e|f)/ig, "3")
	.replace(/(g|h|i)/ig, "4")
	.replace(/(j|k|l)/ig, "5")
	.replace(/(m|n|o)/ig, "6")
	.replace(/(p|q|r|s)/ig, "7")
	.replace(/(t|u|v)/ig, "8")
	.replace(/(w|x|y|z)/ig, "9")
	.replace(/-/ig, "")
	.replace(/("("|")")/ig, "")
	.replace(/\s+/g, "");
