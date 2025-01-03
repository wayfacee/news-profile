import { currencyBaseApi } from "@/shared/api";
import { currencyApiUrls } from "../model/constants/currencyConstants";
import type {
  Currency,
  CurrencyApiResponse,
  CurrencyRequest,
  CurrencySymbol,
  SymbolApiResponse,
} from "../model/types/currency";

// https://api.exchangeratesapi.io/v1/latest?access_key=4c69aad80c47bcf6f5904fc2c619a734&base=EUR&symbols=USD
// https://api.exchangeratesapi.io/latest?access_key=4c69aad80c47bcf6f5904fc2c619a734&base=EUR&symbols=USD,GBP,JPY
const access_key = import.meta.env.VITE_CURRENCY_API_KEY;

const currencyApi = currencyBaseApi.injectEndpoints({
  endpoints: (build) => ({
    currency: build.query<Currency[], CurrencyRequest>({
      query: ({ base, symbols }) => ({
        url: currencyApiUrls.latest,
        params: {
          access_key,
          base,
          symbols: Array.isArray(symbols) ? symbols.join(",") : symbols,
        },
      }),
      transformResponse: ({ rates }: CurrencyApiResponse): Currency[] =>
        Object.entries(rates).map(([currency, cost]) => ({
          currency,
          cost: Math.round(cost), // я знаю что лушче над было копейки include((
        })),
    }),
    symbols: build.query<CurrencySymbol[], void>({
      query: () => ({
        url: currencyApiUrls.symbols,
        params: {
          access_key,
        },
      }),
      transformResponse: ({ symbols }: SymbolApiResponse): CurrencySymbol[] =>
        Object.entries(symbols).map(([currency, fullName]) => ({
          currency,
          fullName,
        })),
    }),
  }),
});

export const { useCurrencyQuery, useLazyCurrencyQuery, useSymbolsQuery } =
  currencyApi;
