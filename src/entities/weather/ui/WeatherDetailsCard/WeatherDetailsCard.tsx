import { cn } from "@/shared/lib";
import React from "react";
import { type Weather } from "../../model/types/weather";

interface Props {
  weather?: Weather;
  className?: string;
}

export const WeatherDetailsCard = React.memo(
  ({ weather, className }: Props) => {
    return (
      <ul className={cn("flex flex-col gap-2", className)}>
        <li>City: {weather?.city}</li>
        <li className="flex items-center gap-3">
          Icon: <img src={weather?.icon} alt={weather?.city} />
        </li>
        <li>Temperature: {weather?.temp}°C</li>
        <li>Weather description: {weather?.weatherDesc}</li>
      </ul>
    );
  },
);
