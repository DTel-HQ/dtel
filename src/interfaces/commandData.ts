/* eslint-disable no-unused-vars */
import { ChatInputApplicationCommandData } from "discord.js";

// eslint-disable-next-line no-shadow
enum PermissionLevel {
	none,
	donator,
	contributor,
	serverAdmin,
	customerSupport,
	maintainer,
}

// eslint-disable-next-line no-shadow
enum CommandType {
	standard,
	call,
	customerSupport,
	maintainer,
}

interface CommandData extends ChatInputApplicationCommandData {
	guildOnly?: boolean;
	numberRequired?: boolean;

	permissionLevel: PermissionLevel;
	useType: CommandType;

	notExecutableInCall?: boolean;
}
export default CommandData;
export { PermissionLevel, CommandType };

