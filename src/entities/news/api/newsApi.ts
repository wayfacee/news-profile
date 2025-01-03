import { baseApi } from "@/shared/api";
import { newsApiUrls } from "../model/constants/newsConstants";
import type { NewsResponse } from "../model/types/news";

const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    news: build.query<NewsResponse, void>({
      query: () => newsApiUrls.news,
    }),
  }),
});

export const { useNewsQuery, useLazyNewsQuery } = newsApi;
