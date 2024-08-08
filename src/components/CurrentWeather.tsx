import Image from "next/image";
import { DailyTemperature, ICurrentWeather } from "@/types/weatherInterfaces";

interface CurrentWeatherProps {
  currentWeather: ICurrentWeather;
  dailyTemp: DailyTemperature;
  city: string;
}

export default function CurrentWeather({
  currentWeather,
  dailyTemp,
  city,
}: CurrentWeatherProps) {
  const { temp, feels_like, humidity, weather } = currentWeather;
  const { main, icon } = weather[0];
  const { min, max } = dailyTemp;

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl xs:text-5xl text-center drop-shadow-md">
        {city}
      </div>
      <div className="text-7xl xs:text-8xl font-thin drop-shadow-lg">
        {Math.round(temp)}º
      </div>
      <div className="flex items-center text-xl xs:text-2xl">
        <div>L:{Math.round(min)}º</div>
        <div className="-mx-16 -mt-28 -mb-20 -z-10">
          <Image
            width={300}
            height={300}
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="temperature icon"
          />
        </div>
        <div>H:{Math.round(max)}º</div>
      </div>
      <div className="flex items-center gap-10 text-center">
        <div>
          <div className="xs:text-lg">Humidity</div>
          <div className="text-xl xs:text-2xl">{Math.round(humidity)}%</div>
        </div>
        <div className="text-xl xs:text-2xl">{main}</div>
        <div>
          <div className="xs:text-lg">Feels like</div>
          <div className="text-xl xs:text-2xl">{Math.round(feels_like)}º</div>
        </div>
      </div>
    </div>
  );
}
