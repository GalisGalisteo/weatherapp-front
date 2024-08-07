import { LocationInput } from "@/types/locationInterfaces";
import { useEffect, useState } from "react";

/**
 * Custom hook to get the user's current location using the Geolocation API.
 */

export default function useGetLocation() {
  const [userLocation, setUserLocation] = useState<LocationInput>({
    lon: null,
    lat: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by the browser");
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
          lon: longitude,
          lat: latitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error(`Error getting user location: ${error.message}`);
        setError(
          "An error occurred while getting your location. Please try again."
        );
        setLoading(false);
      }
    );
  }, []);
  return { userLocation, error, loading };
}
