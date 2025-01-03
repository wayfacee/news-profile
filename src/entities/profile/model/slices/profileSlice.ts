import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Profile, ProfileState } from "../types/profile";

const initialState: ProfileState = {
  fullProfile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.fullProfile = action.payload;
    },
  },
});

export const { reducer: profileReducer, actions: profileActions } =
  profileSlice;