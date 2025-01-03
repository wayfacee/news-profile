import { $api, baseApi, currencyBaseApi, weatherBaseApi } from "@/shared/api";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { ExtraArgument, State } from "@/shared/config/store";
import { router } from "../../router";
import { profileReducer } from "@/entities/profile";

export function createReduxStore(
  initialState?: State,
  asyncReducers?: ReducersMapObject<State>,
) {
  const rootReducer: ReducersMapObject<State> = {
    ...asyncReducers,
    profile: profileReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [weatherBaseApi.reducerPath]: weatherBaseApi.reducer,
    [currencyBaseApi.reducerPath]: currencyBaseApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArg: ExtraArgument = {
    api: $api,
    navigate: router.navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<State>,
    devTools: __IS_DEV__,
    preloadedState: initialState,

    // подключаем инстанс к санку:
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat([baseApi.middleware, weatherBaseApi.middleware, currencyBaseApi.middleware]),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<typeof createReduxStore>["getState"];
