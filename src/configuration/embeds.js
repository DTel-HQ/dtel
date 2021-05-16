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
	// Perm error: user doesn't have Manage Guild
	requiresManageGuid: {
		color: config.colors.error,
		title: "Insufficient permissions",
		description: "This command requires the `Manage Guild` (also known as the `Manage Server`) permission. Ask an admin to run this command.",
		footer: `If you have any questions, or if you think you have the Manage Guild permission, please join our support server (${config.guildInvite}) or \`>call *611\`.`,
	},
	// "Perm" error: command cannot be used outside *611
	cannotUseOutside611: { 
		color: config.colors.error,
		title: "Permission error",
		description: "You can’t use this command outside of `*611` calls." 
	},
};
