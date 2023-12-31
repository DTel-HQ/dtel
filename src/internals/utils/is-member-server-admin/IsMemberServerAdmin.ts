import { GuildMember, PermissionsBitField } from "discord.js";

export const isMemberAServerAdmin = (member: GuildMember | null): boolean => member?.permissions?.has(PermissionsBitField.Flags.ManageGuild) ?? false;
