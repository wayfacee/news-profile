import { type ProfileState } from "@/entities/profile";
import { baseApi, weatherBaseApi, currencyBaseApi } from "@/shared/api";

export interface State {
  profile: ProfileState;
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
  [weatherBaseApi.reducerPath]: ReturnType<typeof weatherBaseApi.reducer>;
  [currencyBaseApi.reducerPath]: ReturnType<typeof currencyBaseApi.reducer>;
}

export type StateKey = keyof State;
