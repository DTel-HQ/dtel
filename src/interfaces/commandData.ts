/* eslint-disable no-unused-vars */
import { ChatInputApplicationCommandData } from "discord.js";

// eslint-disable-next-line no-shadow
enum PermissionLevel {
	owner,
	customerSupport,
	serverAdmin,
	none,
}

// eslint-disable-next-line no-shadow
enum CommandType {
	standard,
	call,
	customerSupport,
	maintainer,
}

interface CommandData extends ChatInputApplicationCommandData {
	guildOnly: boolean;

	permissionLevel: PermissionLevel;
	useType: CommandType;
}
export default CommandData;
export { PermissionLevel, CommandType };

