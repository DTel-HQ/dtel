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
			type: "USER",
		}, {
			name: "id",
			description: "ID of user you want to get the balance of",
			required: false,
			type: "STRING",
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
		description: `Evaluates some JS code`,
		options: [{
			name: "code",
			description: "The code you want to evaluate",
			required: true,
			type: "STRING",
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
			type: "STRING",
		}],
		guildOnly: false,
		numberRequired: true,
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
			name: "offender",
			description: "The ID of the number/user/guild/channel you want to strike",
			required: true,
			type: "STRING",
		}, {
			name: "reason",
			description: "The reason for the strike",
			required: true,
			type: "STRING",
		}],

		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
	{
		name: "ninfo",
		description: `Get information on a number. [Support Only]`,
		guildOnly: false,
		numberRequired: false,
		options: [{
			name: "number_or_channel",
			description: "The number/channel id you want to find information about",
			required: true,
			type: "STRING",
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
			type: "STRING",
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
			type: "STRING",
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
			type: "STRING",
		}, {
			name: "credits",
			description: "The amount of credits you want to add (use negative number to remove)",
			required: true,
			type: "INTEGER",
		}],
		permissionLevel: PermissionLevel.customerSupport,
		useType: CommandType.customerSupport,
	},
];

export default commands;
