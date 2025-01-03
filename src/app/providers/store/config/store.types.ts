import type { ExtraArgument, State, StateKey } from "@/shared/config/store";
import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit";

export type MountedReducers = OptionalRecord<StateKey, boolean>; // DynamicModuleLoader

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<State>;
  reduce: (state: State, action: UnknownAction) => State;
  add: (key: StateKey, reducer: Reducer) => void;
  remove: (key: StateKey) => void;

  getMountedReducers: () => MountedReducers;
}

// стандартный тип который возвращается при создании стора
export interface ReduxStoreWithManager extends EnhancedStore<State> {
  reducerManager: ReducerManager;
}

// export interface ThunkExtraArg {
//   api: AxiosInstance;
// } ExtraArgument

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ExtraArgument;
  state: State;
}