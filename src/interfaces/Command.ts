/* eslint-disable no-unused-vars */
import { ChatInputApplicationCommandData } from "discord.js";

// eslint-disable-next-line no-shadow
enum CommandType {
	standard,
	call,
}

// eslint-disable-next-line no-shadow
enum PermissionLevel {
	owner,
	customerSupport,
	serverAdmin,
	none,
}

interface Command extends ChatInputApplicationCommandData {
	guildOnly: boolean;

	useType: CommandType;
	permissionLevel: PermissionLevel;
}
export default Command;
export { CommandType, PermissionLevel };

