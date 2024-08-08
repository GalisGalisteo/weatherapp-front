import Image from "next/image";
import { DailyTemperature } from "@/types/weatherInterfaces";

interface ForecastItemProps {
  day: string;
  icon: string;
  dailyTemp: DailyTemperature;
}

export default function ForecastItem({
  day,
  icon,
  dailyTemp,
}: ForecastItemProps) {
  const { min, max } = dailyTemp;

  return (
    <div
      className="flex flex-col items-center bg-white bg-opacity-15 rounded-2xl py-2 px-3 xs:px-4 xs:text-lg"
      data-testid="forecast-item"
    >
      <div className="">{day}</div>
      <div className="-m-6">
        <Image
          width={90}
          height={90}
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="temperature icon"
        />
      </div>
      <div className="flex gap-2">
        <div className="">{Math.round(min)}º</div>
        <div className="">{Math.round(max)}º</div>
      </div>
    </div>
  );
}
