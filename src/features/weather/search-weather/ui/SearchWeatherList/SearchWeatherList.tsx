import { type Weather, type WeatherHistory } from "@/entities/weather";
import { SearchWeatherItem } from "../SearchWeatherItem/SearchWeatherItem";
import { memo } from "react";

interface Props {
  weather?: Weather;
  weatherHistory?: WeatherHistory;
  isErrorWeather?: boolean;
  onClear: () => void;
  onClickItem: (id: number) => void;
  className?: string;
}

export const SearchWeatherList = memo(
  ({
    weather,
    weatherHistory,
    isErrorWeather,
    onClear,
    onClickItem,
  }: Props) => {
    return (
      <>
        {weather && (
          <SearchWeatherItem weather={weather} onClickItem={onClickItem} />
        )}

        {isErrorWeather && (
          <p className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer">
            <button type="button" onClick={onClear}>
              Город не найден. Попробуйте еще раз...
            </button>
          </p>
        )}

        {weatherHistory &&
          weatherHistory.items.map((weather) => (
            <SearchWeatherItem
              weather={weather}
              onClickItem={onClickItem}
              key={weather.id}
            />
          ))}
      </>
    );
  },
);
