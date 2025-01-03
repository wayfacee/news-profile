import { useState, useCallback } from "react";
import { getJSONFromLS, setToLS } from "@/shared/helpers/manageLocalStorage";
import { LS_WEATHER_HISTORY } from "@/shared/const/weatherConstants";

export const useWeatherHistory = () => {
  const [historyIds, setHistoryIds] = useState<number[] | undefined>(() =>
    getJSONFromLS(LS_WEATHER_HISTORY),
  );

  const updateHistory = useCallback(
    (id: number) => {
      if (historyIds && !historyIds.includes(id)) {
        const updatedHistory =
          historyIds.length >= 5 ? historyIds.slice(1) : historyIds;
        const newHistory = [...updatedHistory, id];
        
        setToLS(LS_WEATHER_HISTORY, newHistory);
        setHistoryIds(newHistory);
      }
    },
    [historyIds],
  );

  return { historyIds, updateHistory };
};
