import {
  useLazyWeatherQuery,
  useLazyWeatherHistoryQuery,
} from "@/entities/weather";
import { useEffect } from "react";

export const useWeatherSearch = (historyIds?: number[]) => {
  const [getWeather, { data: weather, isLoading: isLoadingWeather, isError: isErrorWeather, reset: resetWeather }] =
    useLazyWeatherQuery();

  const [getWeatherHistory, { data: weatherHistory }] =
    useLazyWeatherHistoryQuery();

  useEffect(() => {
    if (historyIds && historyIds.length > 0) {
      getWeatherHistory({
        ids: historyIds,
      });
    }
  }, [getWeatherHistory, historyIds]);

  return {
    weather,
    weatherHistory,
    isLoadingWeather,
    isErrorWeather,
    getWeather,
    resetWeather,
  };
};
