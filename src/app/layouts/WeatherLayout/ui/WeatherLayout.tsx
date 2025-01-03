import { SearchWeather } from "@/features/weather/search-weather";
import { Loader } from "@/shared/ui/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const WeatherLayout = () => {
  return (
    <>
      <SearchWeather className="m-10 w-[400px]" />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
