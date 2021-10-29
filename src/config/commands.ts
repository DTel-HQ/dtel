import Command, { PermissionLevel } from "../Interfaces/Command";

const standardCommands: Command[] = [
	{
		name: "help",
		description: `Gives you help`,
		guildOnly: false,

		permissionLevel: PermissionLevel.none,
	},
];

const maintainerCommands: Command[] = [
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

		permissionLevel: PermissionLevel.owner,
	},
];

const commands = {
	standard: standardCommands,
	maintainer: maintainerCommands,
};

export default commands;
