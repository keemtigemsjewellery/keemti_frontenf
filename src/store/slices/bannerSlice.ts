import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { bannerSliceModel } from "utils/interface/reduxSlice";

const initialState: bannerSliceModel = {
  allBanners: null,
};

const BannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {
    getAllBannersAction: (state, action) => {
      state.allBanners = action.payload;
    },
  },
});

export const { getAllBannersAction } = BannerSlice.actions;

export const getBannersData = (state: RootState) => state.banners;

export default BannerSlice.reducer;
