import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LS_ACCESS_TOKEN_KEY } from "../../const";
import { getFromLS } from "../../helpers/manageLocalStorage";
import { ApiTags } from "../apiTags";

const baseQuery = fetchBaseQuery({
  baseUrl: __API__,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = getFromLS(LS_ACCESS_TOKEN_KEY);

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  tagTypes: Object.values(ApiTags),
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

// const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result.error?.status === 401 && args.url !== "/auth/refresh") {
//     api.dispatch(apiAccessTokenIsBrokenEvent());
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: __API__,
//     prepareHeaders: (headers) => {
//       headers.set("Content-Type", "application/json");
//       const token = localStorage.getItem(LS_ACCESS_TOKEN_KEY) || "";

//       if (token) {
//         headers.set("Authorization", token);
//       }

//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
// });
