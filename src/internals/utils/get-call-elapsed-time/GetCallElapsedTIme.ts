import { ActiveCalls } from "@prisma/client";
import dayjs from "dayjs";

export const getCallElapsedTime = (call: ActiveCalls): string => dayjs(call.started.at).fromNow(true);
