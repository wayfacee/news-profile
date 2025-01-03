import type { Weather, WeatherApiResponse } from "../types/weather";

export const transformWeather = ({
  id,
  name,
  main,
  weather,
}: WeatherApiResponse): Weather => ({
  id,
  city: name,
  temp: Math.round(Number(main.temp)),
  weatherDesc: `${weather[0].main} - ${weather[0].description}`,
  icon: `https://openweathermap.org/img/wn/${weather[0].icon}.png`,
});