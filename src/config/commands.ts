import { ApplicationCommandOptionType } from "discord.js";
import Command, { PermissionLevel, CommandType } from "../interfaces/commandData";

const commands: Command[] = [
	{
		name: "wizard",
		description: "Create a number for your channel",
		guildOnly: false,
		numberRequired: false,
		notExecutableInCall: true,

		permissionLevel: PermissionLevel.serverAdmin,
		useType: CommandType.standard,
	},
	{
		name: "help",
		description: `Gives you help`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "links",
		description: `Shows all of our links.`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "ping",
		description: `Shows the latency between our server and Discord.`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "invite",
		description: `Shows the bot invite link`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "balance",
		description: "Shows your account balance",
		accountRequired: false, // Account is grabbed in situ

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		options: [{
			name: "user",
			description: "User you want to get the balance of (if you're in the same server)",
			required: false,
			type: ApplicationCommandOptionType.User,
		}, {
			name: "id",
			description: "ID of user you want to get the balance of",
			required: false,
			type: ApplicationCommandOptionType.String,
		}],
	},
	{
		name: "info",
		description: `Provides information about the bot`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "daily",
		description: `Claim your daily credit allowance`,
		guildOnly: false,
		numberRequired: false,
		accountRequired: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "eval",
		description: `Evaluates some JS code [Maintainer only]`,
		options: [{
			name: "code",
			description: "The code you want to evaluate",
			required: true,
			type: ApplicationCommandOptionType.String,
		}],
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.maintainer,
		useType: CommandType.maintainer,
	},
	{
		name: "call",
		description: `Call another channel or number`,
		options: [{
			name: "number",
			description: "The number you want to call",
			required: true,
			type: ApplicationCommandOptionType.String,
		}],
		guildOnly: false,
		numberRequired: true,
		accountRequired: true,
		notExecutableInCall: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "rcall",
		description: `Call a random number in the Yellowbook`,
		guildOnly: false,
		numberRequired: true,
		accountRequired: true,
		notExecutableInCall: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "hangup",
		description: `End the call in your channel`,
		guildOnly: false,
		numberRequired: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.call,
	},
	{
		name: "strike",
		description: `Warn a user or guild that their behavior will not be tolerated. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "add",
			description: "Add a strike to a user. [Support Only]",
			type: ApplicationCommandOptionType.Subcommand,
			options: [{
				name: "offender",
				description: "The ID of the number/user/guild/channel you want to strike",
				required: true,
				type: ApplicationCommandOptionType.String,
			}, {
				name: "reason",
				description: "The reason for the strike",
				required: true,
				type: ApplicationCommandOptionType.String,
			}],
		}, {
			name: "remove",
			description: "Remove a strike from a user. [Support Only]",
			type: ApplicationCommandOptionType.Subcommand,
			options: [{
				name: "strike_id",
				description: "The ID of the strike you want to remove",
				required: true,
				type: ApplicationCommandOptionType.String,
			}],
		}],

		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "strikes",
		description: `View your strikes.`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "offender",
			description: "The server/user ID for which you want to find strikes about. [Support Only]",
			required: false,
			type: ApplicationCommandOptionType.String,
		}],

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "ninfo",
		description: `Get information on a number. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "number_or_channel",
			description: "The number/channel ID you want to find information about",
			required: true,
			type: ApplicationCommandOptionType.String,
			minLength: 11,
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	// {
	// 	name: "reassign",
	// 	description: `Transfer details from one number to another. [Support Only]`,
	// 	guildOnly: false,
	// 	numberRequired: false,
	// 	options: [{
	// 		name: "source",
	// 		description: "The number/channel ID you want to transfer details from",
	// 		required: true,
	// 		type: ApplicationCommandOptionType.String,
	// 		minLength: 11,
	// 	}, {
	// 		name: "newChannel",
	// 		description: "The destination number/channel ID",
	// 		required: false,
	// 		type: ApplicationCommandOptionType.String,
	// 		minLength: 1,
	// 	}, {
	// 		name: "newNumber",
	// 		description: "The destination number/channel ID",
	// 		required: false,
	// 		type: ApplicationCommandOptionType.String,
	// 		minLength: 11,
	// 		maxLength: 11,
	// 	}],
	// 	permissionLevel: PermissionLevel.customerSupport,
	// 	useType: CommandType.customerSupport,
	// },
	{
		name: "deassign",
		description: `Delete a number. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "number_or_channel",
			description: "The number or corresponding channel ID you want to delete",
			required: true,
			type: ApplicationCommandOptionType.String,
			minLength: 11,
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "uinfo",
		description: `Get information on a user. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "user",
			description: "The ID of the user you want to find information about",
			required: true,
			type: ApplicationCommandOptionType.String,
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "blacklist",
		description: `Get information on a user. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "id",
			description: "The ID of the number/user/server/channel you want to blacklist",
			required: true,
			type: ApplicationCommandOptionType.String,
		}, {
			name: "reason",
			description: "The reason for this object's addition to the blacklist",
			required: false,
			type: ApplicationCommandOptionType.String,
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "addcredit",
		description: `Add extra DTel Credit to a user. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "user",
			description: "The ID of the user you want to add credit to",
			required: true,
			type: ApplicationCommandOptionType.String,
		}, {
			name: "credits",
			description: "The amount of credits you want to add (use negative number to remove)",
			required: true,
			type: ApplicationCommandOptionType.Integer,
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "status",
		description: `View the status of a call.`,
		guildOnly: false,
		numberRequired: false,
		permissionLevel: PermissionLevel.none,
		useType: CommandType.call,
	},
	{
		name: "cinfo",
		description: `View information about a call. [Support Only]`,
		options: [{
			name: "call_id",
			description: "The ID of the call you want to view information about.",
			required: true,
			type: ApplicationCommandOptionType.String,
		}],
		guildOnly: false,
		numberRequired: false,
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "mention",
		description: `Edit the list of people who get mentioned when a call comes through.`,
		options: [{
			name: "toggle",
			description: "Add or remove yourself from the mentions list",
			type: ApplicationCommandOptionType.Subcommand,
		}, {
			name: "list",
			description: "View the mentions list",
			type: ApplicationCommandOptionType.Subcommand,
		}, {
			name: "remove",
			description: "Remove someone from the mentions list",
			type: ApplicationCommandOptionType.Subcommand,

			permissionLevel: PermissionLevel.serverAdmin,
		}],

		guildOnly: true,
		numberRequired: true,
		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "block",
		description: `Prevent a number from calling you`,
		options: [{
			name: "number",
			description: "The number you want to block",
			required: true,
			type: ApplicationCommandOptionType.String,
		}],
		guildOnly: false,
		numberRequired: true,
		permissionLevel: PermissionLevel.serverAdmin,
		useType: CommandType.standard,
	},
	{
		name: "pay",
		description: `Send DTel Credit to another user.`,
		guildOnly: false,
		numberRequired: false,
		accountRequired: true,

		options: [{
			name: "id",
			description: "Send credit to a user by ID",
			type: ApplicationCommandOptionType.Subcommand,

			options: [{
				name: "id",
				description: "The ID of the user you want to send credit to",
				required: true,
				type: ApplicationCommandOptionType.String,
			}, {
				name: "credits",
				description: "The amount of credits you want to send",
				required: true,
				type: ApplicationCommandOptionType.Integer,
			}, {
				name: "message",
				description: "A message to send along with the credits [optional]",
				required: false,
				type: ApplicationCommandOptionType.String,
			}],
		}, {
			name: "user",
			description: "Send credit to a user by mentioning them",
			type: ApplicationCommandOptionType.Subcommand,

			options: [{
				name: "user",
				description: "The user you want to send credit to",
				required: true,
				type: ApplicationCommandOptionType.User,
			}, {
				name: "credits",
				description: "The amount of credits you want to send",
				required: true,
				type: ApplicationCommandOptionType.Integer,
			}, {
				name: "message",
				description: "A message to send along with the credits [optional]",
				required: false,
				type: ApplicationCommandOptionType.Integer,
			}],
		}],

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "hold",
		description: `Put a call on hold`,
		guildOnly: false,
		numberRequired: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.call,
	},
	{
		name: "mailbox",
		description: `Manage your store of messages.`,
		options: [{
			name: "clear",
			description: "Clear all messages from mailbox",
			type: ApplicationCommandOptionType.Subcommand,

			permissionLevel: PermissionLevel.serverAdmin,
		}, {
			name: "messages",
			description: "View all of the messages in your mailbox",
			type: ApplicationCommandOptionType.Subcommand,

			permissionLevel: PermissionLevel.none,
		}, {
			name: "delete",
			description: "Delete a specific message from your mailbox",
			type: ApplicationCommandOptionType.Subcommand,

			permissionLevel: PermissionLevel.serverAdmin,
		}, {
			name: "settings",
			description: "Change settings about your mailbox",
			type: ApplicationCommandOptionType.Subcommand,

			permissionLevel: PermissionLevel.serverAdmin,
		}],

		guildOnly: true,
		numberRequired: true,
		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
	{
		name: "stats",
		description: `View statistics about the bot. [Maintainer Only]`,
		permissionLevel: PermissionLevel.maintainer,
		useType: CommandType.maintainer,
	},
	{
		name: "addvip",
		description: "Give VIP months to a user following their donation. [Maintainer Only]",
		permissionLevel: PermissionLevel.maintainer,
		useType: CommandType.maintainer,

		options: [{
			name: "user",
			description: "The ID of the user you want to add months to",
			required: true,
			type: ApplicationCommandOptionType.String,
		}, {
			name: "months",
			description: "The number of months you wish to add (use negative number to remove)",
			required: true,
			type: ApplicationCommandOptionType.Integer,
		}],
	},
	{
		name: "vote",
		description: `View information about voting for DTel`,
		guildOnly: false,
		numberRequired: false,
		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
	},
];

export default commands;
