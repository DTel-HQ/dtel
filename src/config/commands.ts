import { ApplicationCommandOptionType } from "discord.js";
import Command, { PermissionLevel, CommandType } from "@src/interfaces/commandData";

// Standard commands
import Wizard from "@src/commands/standard/wizard";
import Help from "@src/commands/standard/help";
import Links from "@src/commands/standard/links";
import Ping from "@src/commands/standard/ping";
import Invite from "@src/commands/standard/invite";
import Balance from "@src/commands/standard/balance";
import Info from "@src/commands/standard/info";
import Daily from "@src/commands/standard/daily";
import Call from "@src/commands/standard/call";
import Rcall from "@src/commands/standard/rcall";
import Strikes from "@src/commands/standard/strikes";
import MentionToggle from "@src/commands/standard/mention toggle";
import MentionList from "@src/commands/standard/mention list";
import MentionRemove from "@src/commands/standard/mention remove";
import Block from "@src/commands/standard/block";
import PayId from "@src/commands/standard/pay id";
import PayUser from "@src/commands/standard/pay user";
import MailboxClear from "@src/commands/standard/mailbox clear";
import MailboxMessages from "@src/commands/standard/mailbox messages";
import MailboxDelete from "@src/commands/standard/mailbox delete";
import MailboxSettings from "@src/commands/standard/mailbox settings";
import Vote from "@src/commands/standard/vote";

// Call commands
import Hangup from "@src/commands/call/hangup";
import Status from "@src/commands/call/status";
import Hold from "@src/commands/call/hold";

// Maintainer commands
import Eval from "@src/commands/maintainer/eval";
import Stats from "@src/commands/maintainer/stats";
import Addvip from "@src/commands/maintainer/addvip";

// Support commands
import Ninfo from "@src/commands/support/ninfo";
import Deassign from "@src/commands/support/deassign";
import Uinfo from "@src/commands/support/uinfo";
import Blacklist from "@src/commands/support/blacklist";
import Addcredit from "@src/commands/support/addcredit";
import Cinfo from "@src/commands/support/cinfo";
import StrikeAdd from "@src/commands/support/strike add";
import StrikeRemove from "@src/commands/support/strike remove";

const commands: Command[] = [
	{
		name: "wizard",
		description: "Create a number for your channel",
		guildOnly: false,
		numberRequired: false,
		notExecutableInCall: true,

		permissionLevel: PermissionLevel.serverAdmin,
		useType: CommandType.standard,
		processor: Wizard,
	},
	{
		name: "help",
		description: `Gives you help`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Help,
	},
	{
		name: "links",
		description: `Shows all of our links.`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Links,
	},
	{
		name: "ping",
		description: `Shows the latency between our server and Discord.`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Ping,
	},
	{
		name: "invite",
		description: `Shows the bot invite link`,
		guildOnly: false,
		numberRequired: false,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Invite,
	},
	{
		name: "balance",
		description: "Shows your account balance",
		accountRequired: false, // Account is grabbed in situ

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Balance,
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
		processor: Info,
	},
	{
		name: "daily",
		description: `Claim your daily credit allowance`,
		guildOnly: false,
		numberRequired: false,
		accountRequired: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.standard,
		processor: Daily,
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
		processor: Eval,
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
		processor: Call,
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
		processor: Rcall,
	},
	{
		name: "hangup",
		description: `End the call in your channel`,
		guildOnly: false,
		numberRequired: true,

		permissionLevel: PermissionLevel.none,
		useType: CommandType.call,
		processor: Hangup,
	},
	{
		name: "strike",
		description: `Warn a user or guild that their behavior will not be tolerated. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		processor: StrikeAdd,
		options: [{
			name: "add",
			description: "Add a strike to a user. [Support Only]",
			type: ApplicationCommandOptionType.Subcommand,
			processor: StrikeAdd,
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
			processor: StrikeRemove,
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
		processor: Strikes,
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
		processor: Ninfo,
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
		processor: Deassign,
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
		processor: Uinfo,
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
		processor: Blacklist,
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
		processor: Addcredit,
	},
	{
		name: "status",
		description: `View the status of a call.`,
		guildOnly: false,
		numberRequired: false,
		permissionLevel: PermissionLevel.none,
		useType: CommandType.call,
		processor: Status,
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
		processor: Cinfo,
	},
	{
		name: "mention",
		description: `Edit the list of people who get mentioned when a call comes through.`,
		processor: MentionToggle,
		options: [{
			name: "toggle",
			description: "Add or remove yourself from the mentions list",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MentionToggle,
		}, {
			name: "list",
			description: "View the mentions list",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MentionList,
		}, {
			name: "remove",
			description: "Remove someone from the mentions list",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MentionRemove,

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
		processor: Block,
	},
	{
		name: "pay",
		description: `Send DTel Credit to another user.`,
		guildOnly: false,
		numberRequired: false,
		accountRequired: true,
		processor: PayId,

		options: [{
			name: "id",
			description: "Send credit to a user by ID",
			type: ApplicationCommandOptionType.Subcommand,
			processor: PayId,

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
			processor: PayUser,

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
		processor: Hold,
	},
	{
		name: "mailbox",
		description: `Manage your store of messages.`,
		processor: MailboxClear,
		options: [{
			name: "clear",
			description: "Clear all messages from mailbox",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MailboxClear,

			permissionLevel: PermissionLevel.serverAdmin,
		}, {
			name: "messages",
			description: "View all of the messages in your mailbox",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MailboxMessages,

			permissionLevel: PermissionLevel.none,
		}, {
			name: "delete",
			description: "Delete a specific message from your mailbox",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MailboxDelete,

			permissionLevel: PermissionLevel.serverAdmin,
		}, {
			name: "settings",
			description: "Change settings about your mailbox",
			type: ApplicationCommandOptionType.Subcommand,
			processor: MailboxSettings,

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
		processor: Stats,
	},
	{
		name: "addvip",
		description: "Give VIP months to a user following their donation. [Maintainer Only]",
		permissionLevel: PermissionLevel.maintainer,
		useType: CommandType.maintainer,
		processor: Addvip,

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
		processor: Vote,
	},
];

export default commands;
