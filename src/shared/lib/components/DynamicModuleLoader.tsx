import { useStore } from "react-redux";
import { ReactNode, useEffect } from "react";
import { ReduxStoreWithManager } from "@/app/providers/store";
import { Reducer } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { type State, type StateKey } from "@/shared/config/store";

export type ReducersList = {
  [name in StateKey]?: Reducer<NonNullable<State[name]>>;
};

// type ReducerListEntry = [StateKey, Reducer];

interface Props {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = ({
  reducers,
  removeAfterUnmount = true,
  children,
}: Props) => {
  const store = useStore() as ReduxStoreWithManager; // получаем редакс стор
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateKey];

      if (!mounted) {
        store.reducerManager.add(name as StateKey, reducer);

        dispatch({ type: `@INIT ${name} reducer ` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

  return <>{children}</>;
};
