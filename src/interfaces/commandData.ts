/* eslint-disable no-unused-vars */
import { ApplicationCommandOptionData, ApplicationCommandSubCommandData, ChatInputApplicationCommandData } from "discord.js";

// eslint-disable-next-line no-shadow
enum PermissionLevel {
	none,
	donator,
	contributor,
	serverAdmin,
	customerSupport,
	manager,
	maintainer,
}

// eslint-disable-next-line no-shadow
enum CommandType {
	standard,
	call,
	customerSupport,
	maintainer,
}

interface SubcommandData extends ApplicationCommandSubCommandData {
	permissionLevel: PermissionLevel;
	useType: CommandType;
}

type CommandOptions = ApplicationCommandOptionData | SubcommandData;

interface CommandData extends ChatInputApplicationCommandData {
	options?: CommandOptions[],

	guildOnly?: boolean;
	numberRequired?: boolean;
	accountRequired?: boolean;

	permissionLevel: PermissionLevel;
	useType: CommandType;

	notExecutableInCall?: boolean;
}
export default CommandData;
export { PermissionLevel, CommandType, SubcommandData };

