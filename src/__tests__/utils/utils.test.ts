import moment from "moment";
import { getWeekdayFromTimestamp } from "@/utils/utils";

describe("getWeekdayFromTimestamp", () => {
  it("should return 'Today' if the timestamp is for today", () => {
    const todayTimestamp = moment().unix();
    expect(getWeekdayFromTimestamp(todayTimestamp)).toBe("Today");
  });

  it("should return the correct weekday for a given timestamp", () => {
    const mondayTimestamp = moment()
      .day(1)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const monday = getWeekdayFromTimestamp(mondayTimestamp);
    expect(monday).toBe("Mon");
    expect(monday).not.toBe("Today");

    const tuesdayTimestamp = moment()
      .day(2)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const tuesday = getWeekdayFromTimestamp(tuesdayTimestamp);
    expect(tuesday).toBe("Tue");
    expect(tuesday).not.toBe("Today");

    const wednesdayTimestamp = moment()
      .day(3)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const wednesday = getWeekdayFromTimestamp(wednesdayTimestamp);
    expect(wednesday).toBe("Wed");
    expect(wednesday).not.toBe("Today");

    const thursdayTimestamp = moment()
      .day(4)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const thursday = getWeekdayFromTimestamp(thursdayTimestamp);
    expect(thursday).toBe("Thu");
    expect(thursday).not.toBe("Today");

    const fridayTimestamp = moment()
      .day(5)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const friday = getWeekdayFromTimestamp(fridayTimestamp);
    expect(friday).toBe("Fri");
    expect(friday).not.toBe("Today");

    const saturdayTimestamp = moment()
      .day(6)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const saturday = getWeekdayFromTimestamp(saturdayTimestamp);
    expect(saturday).toBe("Sat");
    expect(saturday).not.toBe("Today");

    const sundayTimestamp = moment()
      .day(0)
      .startOf("day")
      .subtract(1, "week")
      .unix();
    const sunday = getWeekdayFromTimestamp(sundayTimestamp);
    expect(sunday).toBe("Sun");
    expect(sunday).not.toBe("Today");
  });
});
