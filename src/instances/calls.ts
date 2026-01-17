// import { ActiveCalls, CallMessages, Numbers } from "@prisma/client";
// import { Collection } from "discord.js";

import { CallMessages } from "@prisma/client";
import { Collection } from "discord.js";

export const callMessagesCache = new Collection<string, CallMessages>();

