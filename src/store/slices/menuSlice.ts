import { createSlice } from "@reduxjs/toolkit";
import { menuSliceEnum } from "../../utils/enum/enum";
import { levelModel, menuSliceModel } from "utils/interface/reduxSlice";
import { RootState } from "store/store";

const initialState: menuSliceModel = {
  level1: null,
  level2: null,
  level3: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    getMenuListingAction: (state, action) => {
      state.level1 = action.payload?.filter(
        (item: levelModel) => item?.type === menuSliceEnum.LEVEL1
      );
      state.level2 = action.payload?.filter(
        (item: levelModel) => item?.type === menuSliceEnum.LEVEL2
      );
      state.level3 = action.payload?.filter(
        (item: levelModel) => item?.type === menuSliceEnum.LEVEL3
      );
    },
  },
});

export const { getMenuListingAction } = menuSlice.actions;

export const getMenuLevelsData = (state: RootState) => state.menus;

export default menuSlice.reducer;
