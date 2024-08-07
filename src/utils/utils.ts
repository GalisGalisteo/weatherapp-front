import moment from "moment";

/**
 * Get the weekday from a timestamp.
 */

export function getWeekdayFromTimestamp(timestamp: number) {
  const date = moment.unix(timestamp);
  const today = moment().startOf("day");

  if (date.isSame(today, "day")) {
    return "Today";
  }

  const weekday = date.format("ddd");

  return weekday;
}
