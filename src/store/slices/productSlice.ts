import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: any = {
  isMobileViewFilterOpen: false,
  recentProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setRecentProductsAction: (state, action) => {
      const tempArray = [...state.recentProducts];
      const isProductExist = tempArray?.some(
        (item) => item._id === action.payload._id
      );

      const updateRecentProductArray = (array: any, secondaryArray: any) => {
        if (array?.length < 6) {
          secondaryArray.unshift(action.payload);
          state.recentProducts = secondaryArray;
        } else {
          secondaryArray.pop();
          secondaryArray.unshift(action.payload);
          state.recentProducts = secondaryArray;
        }
      };

      if (isProductExist) {
        const allProductsWithoutCurrent = tempArray.filter(
          (tempItem) => tempItem._id !== action.payload._id
        );
        updateRecentProductArray(
          allProductsWithoutCurrent,
          allProductsWithoutCurrent
        );
      } else {
        updateRecentProductArray(state?.recentProducts, tempArray);
      }
    },
    setMobileViewFilterVisiblityAction: (state, action) => {
      state.isMobileViewFilterOpen = action.payload;
    },
  },
});

export const { setRecentProductsAction, setMobileViewFilterVisiblityAction } =
  productSlice.actions;

export const getProductsData = (state: RootState) => state.product;

export default productSlice.reducer;
