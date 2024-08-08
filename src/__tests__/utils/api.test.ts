import { fetchLocationWeather } from "@/utils/api";
import { LocationInput, Location } from "@/types/locationInterfaces";
import { WeatherData } from "@/types/weatherInterfaces";

// Mocking fetch
global.fetch = jest.fn();

const mockLocationInput: LocationInput = {
  lon: -122.4194,
  lat: 37.7749,
};

export const mockFetchResponse: WeatherData = {
  lat: 37.2939,
  lon: -7.3409,
  timezone: "Europe/Madrid",
  timezone_offset: 7200,
  current: {
    dt: 1723053752,
    sunrise: 1723009152,
    sunset: 1723059062,
    temp: 28.07,
    feels_like: 27.06,
    pressure: 1009,
    humidity: 28,
    dew_point: 7.87,
    uvi: 0.5,
    clouds: 0,
    visibility: 10000,
    wind_speed: 5.55,
    wind_deg: 204,
    wind_gust: 6.38,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  },
  daily: [],
};

describe("fetchLocationWeather", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch location weather data successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFetchResponse,
    });

    const data = await fetchLocationWeather(mockLocationInput);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/weather?lon=${mockLocationInput.lon}&lat=${mockLocationInput.lat}`
    );
    expect(data).toEqual(mockFetchResponse);
  });

  it("should return null if lon or lat is null", async () => {
    const invalidLocationInput: LocationInput = {
      lon: null,
      lat: 41.3851,
    };

    const data = await fetchLocationWeather(invalidLocationInput);
    expect(data).toBeNull();
  });

  it("should throw an error if fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    await expect(fetchLocationWeather(mockLocationInput)).rejects.toThrow(
      "Failed to fetch data: Internal Server Error"
    );
  });

  it("should handle fetch exceptions", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchLocationWeather(mockLocationInput)).rejects.toThrow(
      "Network Error"
    );
  });
});
