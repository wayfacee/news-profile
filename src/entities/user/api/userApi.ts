import { rtkApi } from "@/shared/api";
import type { User } from "../model/types/user";

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // помимо юзерИД был бы токен, это либо JWT token или другая схема
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;