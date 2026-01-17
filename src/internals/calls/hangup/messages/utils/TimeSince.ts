import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const timeSince = (date: Date): string => dayjs(date).fromNow(true);
