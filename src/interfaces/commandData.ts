/* eslint-disable no-unused-vars */
import CommandProcessor from "@src/internals/commandProcessor";
import Constructable from "@src/interfaces/constructable";
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
	processor?: Constructable<CommandProcessor>;
}

type CommandOptions = ApplicationCommandOptionData | SubcommandData;

interface CommandData extends ChatInputApplicationCommandData {
	processor: Constructable<CommandProcessor>;
	options?: CommandOptions[],

	guildOnly?: boolean;
	numberRequired?: boolean;
	accountRequired?: boolean;

	permissionLevel: PermissionLevel;
	useType: CommandType;

	notExecutableInCall?: boolean;

	params?: string[];
}
export default CommandData;
export { PermissionLevel, CommandType, type SubcommandData };

