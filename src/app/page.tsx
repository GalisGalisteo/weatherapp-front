"use client";

import { useEffect, useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import useGetLocation from "@/hooks/useGetLocation";

import CurrentWeather from "@/components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather/ForecastWeather";
import Map from "@/components/Map";

import { fetchLocationWeather } from "@/utils/api";
import { LocationInput } from "@/types/locationInterfaces";
import LoadingIcon from "@/components/common/LoadingIcon";
import Button from "@/components/common/Button";

export default function Home() {
  const [location, setLocation] = useState<LocationInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom hook to get user's current location
  const {
    userLocation,
    error: getLocationError,
    loading: getLocationLoading,
  } = useGetLocation();

  // Custom hook to fetch data (weather based on location and 10 nearby locations)
  const {
    data,
    loading: fetchDataLoading,
    error: fetchDataError,
    refetch,
  } = useFetchData({
    apiCall: fetchLocationWeather,
    params: location,
  });

  // Set location when userLocation is obtained
  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

  // Manage loading state based on the hooks' loading statuses
  useEffect(() => {
    if (getLocationLoading || fetchDataLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [getLocationLoading, fetchDataLoading]);

  // Manage error state based on the hooks' error statuses
  useEffect(() => {
    if (getLocationError) {
      setError(getLocationError);
    } else if (fetchDataError) {
      setError(fetchDataError);
    } else {
      setError(null);
    }
  }, [getLocationError, fetchDataError]);

  return (
    <main className="flex flex-col items-center pt-10 max-lg:max-w-[500px] mx-auto">
      {error && <div className="m-5 text-red-500">Error: {error}</div>}
      {!loading && data ? (
        <>
          <div className="flex max-lg:flex-col gap-10">
            <div className="flex flex-col items-center justify-center">
              <CurrentWeather
                currentWeather={data.weather.current}
                dailyTemp={data.weather.daily[0].temp}
                city={data.locations[0].city}
              />
              <Button className="max-lg:hidden" onClick={refetch}>
                Refresh
              </Button>
            </div>
            <ForecastWeather daily={data.weather.daily} />
          </div>
          <Button className="lg:hidden" onClick={refetch}>
            Refresh
          </Button>
          <Map locations={data.locations} setLocation={setLocation} />
        </>
      ) : (
        <div className="flex h-[500px]">
          <LoadingIcon />
        </div>
      )}
    </main>
  );
}
