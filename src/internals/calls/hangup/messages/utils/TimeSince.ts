import dayjs from "dayjs";

export const timeSince = (date: Date): string => dayjs(date).fromNow(true);
