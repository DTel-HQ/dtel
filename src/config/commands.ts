import Command, { PermissionLevel, CommandType } from "../Interfaces/Command";

const commands: Command[] = [
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
		useType: CommandType.standard,
	},
];

export default commands;
