import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: any = {
  allWishlists: [],
  wishListStatus: [],
};

const wishlistedSlice = createSlice({
  name: "wishlistProducts",
  initialState,
  reducers: {
    getWishListProductsAction: (state, action) => {
      state.allWishlists = action.payload;
    },
    removeProductFromAllWishListsAction: (state, action) => {
      state.allWishlists =
        state.allWishlists &&
        state.allWishlists.filter(
          (wishlistProductsItem: any) =>
            wishlistProductsItem._id !== action.payload
        );
    },
    // For Product Listing page
    setProductToWishListStatusAction: (state, action) => {
      state.wishListStatus = action.payload;
    },
    updateProductToWishListStatusAction: (state, action) => {
      const productIndex = state.wishListStatus.findIndex(
        (product: any) => product.id === action.payload
      );

      if (productIndex !== -1) {
        state.wishListStatus[productIndex].isWishlisted =
          !state.wishListStatus[productIndex].isWishlisted;
      }
    },
  },
});

export const {
  getWishListProductsAction,
  removeProductFromAllWishListsAction,
  setProductToWishListStatusAction,
  updateProductToWishListStatusAction,
} = wishlistedSlice.actions;

export const getWishlistData = (state: RootState) => state.wishlist;

export default wishlistedSlice.reducer;
