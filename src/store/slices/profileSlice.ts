import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: any = {
  userDetails: {},
  settings: {},
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUserDetailsAction: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserDetailsAction: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUserDetailsAction: (state, action) => {
      state.userDetails = action.payload;
    },
    setGlobalSettingValueAction: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const {
  setUserDetailsAction,
  getUserDetailsAction,
  removeUserDetailsAction,
  setGlobalSettingValueAction,
} = ProfileSlice.actions;

export const getUserDetailsData = (state: RootState) =>
  state.profile.userDetails;

export const getGlobalSettingsData = (state: RootState) =>
  state.profile.settings;

export default ProfileSlice.reducer;
