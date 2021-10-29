/* eslint-disable no-unused-vars */
import { ChatInputApplicationCommandData } from "discord.js";

// eslint-disable-next-line no-shadow
enum PermissionLevel {
	owner,
	customerSupport,
	serverAdmin,
	none,
}

interface Command extends ChatInputApplicationCommandData {
	guildOnly: boolean;

	permissionLevel: PermissionLevel;
}
export default Command;
export { PermissionLevel };

