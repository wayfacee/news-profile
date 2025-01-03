import { useWeatherQuery, WeatherDetailsCard } from "@/entities/weather";
import { ROUTES } from "@/shared/config/router";
import { Navigate, useParams } from "react-router-dom";

const WeatherDetailsPage = () => {
  const { city } = useParams();

  if (!city) return <Navigate to={ROUTES.weather.page} replace />;
  const { data, isLoading } = useWeatherQuery({ city });

  if (isLoading) return "Loading...";

  return <WeatherDetailsCard weather={data} className="mx-auto" />;
};

export default WeatherDetailsPage;