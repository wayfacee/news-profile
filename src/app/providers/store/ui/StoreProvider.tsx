import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { type State } from "@/shared/config/store";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<State>;
  asyncReducers?: DeepPartial<ReducersMapObject<State>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(
    initialState as State,
    asyncReducers as ReducersMapObject<State>,
  );

  return <Provider store={store}>{children}</Provider>;
};
