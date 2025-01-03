import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { MountedReducers, ReducerManager } from "./store.types";
import { type State, type StateKey } from "@/shared/config/store";

export function createReducerManager(
  initialReducers: ReducersMapObject<State>,
): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // массив хранит назв. редюсеров, которые хотим удалить
  let keysToRemove: StateKey[] = [];
  const mountedReducers: MountedReducers = {};

  return {
    // возв. список редюсер, и смот. вмонтирован редюс
    // или нет, поэтому код-ревью нужен
    getReducerMap: () => reducers,

    getMountedReducers: () => mountedReducers,

    // редюсер
    reduce: (state: State, action: AnyAction) => {
      // если в массиве (keysToRemove) есть какие то ключи, то полнотью удаляем
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return combinedReducer(state, action);
    },

    add: (key: StateKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // по ключу добавляют новый редюсер
      reducers[key] = reducer;
      mountedReducers[key] = true;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: StateKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      // удаляет
      delete reducers[key];
      mountedReducers[key] = false;

      // добавляет ключ в массив
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}
