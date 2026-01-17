import { Message } from "discord.js";

export const messageHasAttachments = (message: Message): boolean => message.attachments.size > 0;
