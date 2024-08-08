// src/components/common/ForecastItem.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastItem from "@/components/ForecastWeather/ForecastItem";

describe("ForecastItem component", () => {
  const mockProps = {
    day: "Monday",
    icon: "10d",
    dailyTemp: {
      day: 25,
      min: 15,
      max: 25,
      night: 20,
      eve: 22,
      morn: 18,
    },
  };

  test("renders ForecastItem with correct attributes", () => {
    render(<ForecastItem {...mockProps} />);

    const dayElement = screen.getByText(/Monday/i);
    expect(dayElement).toBeInTheDocument();

    const iconElement = screen.getByAltText(/temperature icon/i);
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/10d@2x.png"
    );

    const minTempElement = screen.getByText(/15º/i);
    expect(minTempElement).toBeInTheDocument();

    const maxTempElement = screen.getByText(/25º/i);
    expect(maxTempElement).toBeInTheDocument();
  });
});
