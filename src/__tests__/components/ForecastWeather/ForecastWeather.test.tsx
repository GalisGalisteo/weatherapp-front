// src/components/common/ForecastWeather.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { getWeekdayFromTimestamp } from "@/utils/utils";
import { DailyWeather } from "@/types/weatherInterfaces";
import ForecastWeather from "@/components/ForecastWeather/ForecastWeather";

jest.mock("@/utils/utils", () => ({
  getWeekdayFromTimestamp: jest.fn(),
}));

describe("ForecastWeather component", () => {
  const mockDailyWeather: DailyWeather[] = [
    {
      dt: 1620928800,
      sunrise: 1620900600,
      sunset: 1620942000,
      moonrise: 1620912000,
      moonset: 1620950400,
      moon_phase: 0.5,
      summary: "Sunny day",
      temp: {
        day: 25,
        min: 15,
        max: 25,
        night: 20,
        eve: 22,
        morn: 18,
      },
      feels_like: {
        day: 25,
        night: 20,
        eve: 22,
        morn: 18,
      },
      pressure: 1015,
      humidity: 60,
      dew_point: 12,
      wind_speed: 5,
      wind_deg: 180,
      wind_gust: 10,
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "10d",
        },
      ],
      clouds: 0,
      pop: 0,
      uvi: 10,
    },
    {
      dt: 1620928900,
      sunrise: 1620900600,
      sunset: 1620942000,
      moonrise: 1620912000,
      moonset: 1620950400,
      moon_phase: 0.5,
      summary: "Sunny day",
      temp: {
        day: 25,
        min: 15,
        max: 25,
        night: 20,
        eve: 22,
        morn: 18,
      },
      feels_like: {
        day: 25,
        night: 20,
        eve: 22,
        morn: 18,
      },
      pressure: 1015,
      humidity: 60,
      dew_point: 12,
      wind_speed: 5,
      wind_deg: 180,
      wind_gust: 10,
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "10d",
        },
      ],
      clouds: 0,
      pop: 0,
      uvi: 10,
    },
  ];

  beforeEach(() => {
    (getWeekdayFromTimestamp as jest.Mock).mockImplementation((timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString("en-US", { weekday: "long" });
    });
  });

  test("renders ForecastWeather with correct attributes", () => {
    render(<ForecastWeather daily={mockDailyWeather} />);

    const forecastItems = screen.getAllByTestId("forecast-item");
    expect(forecastItems).toHaveLength(mockDailyWeather.length);

    mockDailyWeather.forEach((day, index) => {
      const weekday = getWeekdayFromTimestamp(day.dt);
      const weekdayElements = screen.getAllByText(weekday);
      expect(weekdayElements[index]).toBeInTheDocument();
      expect(screen.getAllByAltText("temperature icon")[index]).toHaveAttribute(
        "src",
        `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
      );
      expect(
        screen.getAllByText(`${Math.round(day.temp.min)}º`)[index]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(`${Math.round(day.temp.max)}º`)[index]
      ).toBeInTheDocument();
    });
  });
});
