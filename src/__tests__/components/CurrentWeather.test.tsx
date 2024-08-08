import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ICurrentWeather, DailyTemperature } from "@/types/weatherInterfaces";
import CurrentWeather from "@/components/CurrentWeather";

describe("CurrentWeather component", () => {
  const mockCurrentWeather: ICurrentWeather = {
    dt: 1620928800,
    sunrise: 1620900600,
    sunset: 1620942000,
    temp: 25,
    feels_like: 27,
    pressure: 1015,
    humidity: 60,
    dew_point: 12,
    uvi: 10,
    clouds: 0,
    visibility: 10000,
    wind_speed: 5,
    wind_deg: 1,
    wind_gust: 10,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  };

  const mockDailyTemp: DailyTemperature = {
    day: 25,
    min: 15,
    max: 30,
    night: 20,
    eve: 22,
    morn: 18,
  };

  const city = "Test City";

  beforeEach(() => {
    render(
      <CurrentWeather
        currentWeather={mockCurrentWeather}
        dailyTemp={mockDailyTemp}
        city={city}
      />
    );
  });

  test("renders city name", () => {
    expect(screen.getByText(city)).toBeInTheDocument();
  });

  test("renders current temperature", () => {
    expect(screen.getByText(/25º/)).toBeInTheDocument();
  });

  test("renders min and max temperatures", () => {
    expect(screen.getByText(/L:15º/)).toBeInTheDocument();
    expect(screen.getByText(/H:30º/)).toBeInTheDocument();
  });

  test("renders humidity", () => {
    expect(screen.getByText(/Humidity/)).toBeInTheDocument();
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });

  test("renders main weather description", () => {
    expect(screen.getByText(/Clear/)).toBeInTheDocument();
  });

  test("renders feels like temperature", () => {
    expect(screen.getByText(/Feels like/)).toBeInTheDocument();
    expect(screen.getByText(/27º/)).toBeInTheDocument();
  });

  test("renders weather icon", () => {
    const icon = screen.getByAltText("temperature icon");
    expect(icon).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@4x.png"
    );
  });
});
