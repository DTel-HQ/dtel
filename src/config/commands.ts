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
		accountRequired: true,

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
];

export default commands;
