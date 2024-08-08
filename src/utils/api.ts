import { getBackUrl } from "@/config/config";
import { Location, LocationInput } from "@/types/locationInterfaces";
import { WeatherData } from "@/types/weatherInterfaces";

const backUrl = getBackUrl();

interface FetchLocationWeather {
  locations: Location[];
  weather: WeatherData;
}
/**
 * Fetch location weather data from the backend API.
 */

export async function fetchLocationWeather(
  location: LocationInput
): Promise<FetchLocationWeather | null> {
  try {
    const { lon, lat } = location;
    if (lon === null || lat === null) {
      return null;
    }
    const response = await fetch(`${backUrl}/weather?lon=${lon}&lat=${lat}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data: ${(error as Error).message}`);
    throw new Error((error as Error).message);
  }
}
