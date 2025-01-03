import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherBaseApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: __WEATHER_API__,
  }),
  endpoints: () => ({}),
});