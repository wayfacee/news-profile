import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserSchema } from "../types/user";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const";
import { initAuthData } from "../services/initAuthData";

const initialState: UserSchema = {
  _inited: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload.id));
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        state._inited = true;
      },
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
