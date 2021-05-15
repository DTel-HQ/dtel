/* eslint-disable no-inline-comments */
// This file contains a series of commonly-used embed objects.
module.exports = {
	// Registry error: no number
	noNumber: {
		color: config.colors.error,
		title: "Registry error",
		description: "This channel doesn't have a number assigned. Use >wizard to set one up, then try this command again.",
		footer: `If you have any questions, please join our support server (${config.guildInvite}) or, in a channel with a number, \`>call *611\`.`,
	},
};
