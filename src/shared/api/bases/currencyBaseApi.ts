import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://exchangeratesapi.io/latest?base=USD&symbols=EUR,RUB,GBR

// https://api.exchangeratesapi.io/v1/latest?access_key=4c69aad80c47bcf6f5904fc2c619a734&base=EUR&symbols=USD
export const currencyBaseApi = createApi({
  reducerPath: "currencyBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: __CURRENCY_API__,
  }),
  endpoints: () => ({}),
});
