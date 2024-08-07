import ForecastItem from "./ForecastItem";
import { DailyWeather } from "@/types/weatherInterfaces";
import { getWeekdayFromTimestamp } from "@/utils/utils";

interface ForecastWeatherProps {
  daily: DailyWeather[];
}

export default function ForecastWeather({ daily }: ForecastWeatherProps) {
  return (
    <div className="flex lg:flex-col flex-wrap max-lg:justify-center gap-2 lg:h-[500px]">
      {daily.map((day: DailyWeather) => {
        const weekday = getWeekdayFromTimestamp(day.dt);
        return (
          <ForecastItem
            key={day.dt}
            day={weekday}
            icon={day.weather[0].icon}
            dailyTemp={day.temp}
          />
        );
      })}
    </div>
  );
}
