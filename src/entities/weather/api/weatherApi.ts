import { weatherBaseApi } from "@/shared/api";
import { weatherApiUrls } from "../model/constants/weatherConstants";
import type {
  Weather,
  WeatherApiResponse,
  WeatherHistory,
  WeatherHistoryApiResponse,
  WeatherHistoryRequest,
  WeatherRequest,
} from "../model/types/weather";
import { transformWeather } from "../model/lib/transformWeather";

const params = { appid: import.meta.env.VITE_WEATHER_API_KEY, units: "metric" };

const weatherApi = weatherBaseApi.injectEndpoints({
  endpoints: (build) => ({
    weather: build.query<Weather, WeatherRequest>({
      query: ({ city }) => ({
        url: weatherApiUrls.weather,
        params: {
          q: city,
          ...params,
        },
      }),
      transformResponse: (weather: WeatherApiResponse): Weather =>
        transformWeather(weather),
    }),
    // https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&appid=e3202306aae7326a029a310d8a8047e5
    weatherHistory: build.query<WeatherHistory, WeatherHistoryRequest>({
      query: ({ ids }) => ({
        url: weatherApiUrls.weatherHistory,
        params: {
          id: ids.join(","),
          ...params,
        },
      }),
      transformResponse: ({
        cnt,
        list,
      }: WeatherHistoryApiResponse): WeatherHistory => ({
        count: cnt,
        items: list.map((weather) => transformWeather(weather)),
      }),
    }),
  }),
});

export const {
  useWeatherQuery,
  useLazyWeatherQuery,
  useWeatherHistoryQuery,
  useLazyWeatherHistoryQuery,
} = weatherApi;
