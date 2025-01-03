export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  snow?: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherRequest {
  city: string;
}

export interface Weather {
  id: number;
  city: string;
  temp: number;
  weatherDesc: string;
  icon: string;
}

// WeatherHistory
export interface WeatherHistoryRequest {
  ids: number[];
}

export interface WeatherHistoryApiResponse {
  cnt: number;
  list: WeatherApiResponse[];
}

export interface WeatherHistory {
  count: number;
  items: Weather[];
}
