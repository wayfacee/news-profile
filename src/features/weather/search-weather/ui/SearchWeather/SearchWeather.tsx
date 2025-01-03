import { useCallback, useState } from "react";
import { useDebounce } from "react-use";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { SearchWeatherList } from "../SearchWeatherList/SearchWeatherList";
import { useWeatherFocus } from "../../model/hooks/useWeatherFocus";
import { useWeatherSearch } from "../../model/hooks/useWeatherSearch";
import { useWeatherHistory } from "../../model/hooks/useWeatherHistory";
import { SearchWeatherInput } from "../SearchWeatherInput/SearchWeatherInput";

interface Props {
  className?: string;
}

export const SearchWeather = ({ className }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { focused, setFocused, ref } = useWeatherFocus();
  const { historyIds, updateHistory } = useWeatherHistory();
  const {
    getWeather,
    weather,
    resetWeather,
    isErrorWeather,
    isLoadingWeather,
    weatherHistory,
  } = useWeatherSearch(historyIds);

  useDebounce(
    () => {
      if (searchQuery.length >= 2) {
        getWeather({ city: searchQuery });
      }
    },
    1000,
    [searchQuery],
  );

  const onClickItem = useCallback(
    (id: number) => {
      updateHistory(id);
      setFocused(false);
      setSearchQuery("");
      resetWeather();
    },
    [updateHistory, setFocused, resetWeather],
  );

  const onClear = useCallback(() => {
    setSearchQuery("");
    resetWeather();
  }, [resetWeather]);

  const onSearch = () => {
    if (searchQuery) {
      getWeather({ city: searchQuery });
    }
  };

  return (
    <>
      {focused && (
        <div
          onClick={() => setFocused(false)}
          className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
        />
      )}

      <div
        ref={ref}
        className={cn(
          "flex items-center rounded-2xl w-full relative h-10 z-30 bg-gray-100",
          className,
        )}
      >
        <SearchWeatherInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setFocused={setFocused}
        />

        <Button
          onClick={onSearch}
          loading={isLoadingWeather}
          className="rounded-r-2xl !rounded-l-none z-30 font-semibold"
        >
          Поиск
        </Button>

        <div
          className={cn(
            "absolute w-full bg-white rounded-xl top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12",
          )}
        >
          <SearchWeatherList
            weather={weather}
            weatherHistory={weatherHistory}
            isErrorWeather={isErrorWeather}
            onClear={onClear}
            onClickItem={onClickItem}
          />
        </div>
      </div>
    </>
  );
};
