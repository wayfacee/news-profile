import { baseApi } from "@/shared/api";
import { authApiUrls } from "../model/constants/authConstants";
import type { LoginBodyRequest, LoginResponse } from "../model/types/auth";
import { removeFromLS, setToLS } from "@/shared/helpers/manageLocalStorage";
import { LS_ACCESS_TOKEN_KEY } from "@/shared/const";
import { ROUTES } from "@/shared/config/router";
import { type ExtraArgument } from "@/shared/config/store";
import { toast } from "@/shared/hooks/useToast";
import { profileActions } from "../../profile";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginBodyRequest>({
      query: (body) => ({
        url: authApiUrls.login,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, extra }) {
        try {
          const {
            data: { access_token, user },
          } = await queryFulfilled;

          setToLS(LS_ACCESS_TOKEN_KEY, access_token);
          dispatch(profileActions.setProfile(user));
          const typedExtra = extra as ExtraArgument;
          typedExtra.navigate(ROUTES.profile.page);

          toast({
            title: "Вы успешно вошли в свой аккаунт!",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Не удалось войти в аккаунт",
            description: "Введите корректные данные или попробуйте позже!",
          });

          console.error(error);
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: authApiUrls.logout,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, extra, dispatch }) {
        try {
          await queryFulfilled;
          removeFromLS(LS_ACCESS_TOKEN_KEY);
          const typedExtra = extra as ExtraArgument;
          typedExtra.navigate(ROUTES.auth.login.page);
          dispatch(profileActions.setProfile(null));
          dispatch(baseApi.util.resetApiState()); // очистка кэша
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
