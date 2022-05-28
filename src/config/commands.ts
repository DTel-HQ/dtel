import Command, { PermissionLevel, CommandType } from "../interfaces/commandData";

const commands: Command[] = [
	{
		name: "wizard",
		description: "Create a number for your channel",
		guildOnly: false,
		numberRequired: false,

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
		callExclusive: true,

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
