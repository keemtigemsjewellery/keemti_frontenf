import { combineReducers } from "@reduxjs/toolkit";

// Slices
import menuSlice from "./slices/menuSlice";
import wishListSlice from "./slices/wishlistSlice";
import bannerSlice from "./slices/bannerSlice";
import profileSlice from "./slices/profileSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import addressSlice from "./slices/addressSlice";
import productSlice from "./slices/productSlice";

export const rootReducer = combineReducers({
  cart: cartSlice,
  product: productSlice,
  address: addressSlice,
  orders: orderSlice,
  wishlist: wishListSlice,
  menus: menuSlice,
  banners: bannerSlice,
  profile: profileSlice,
});
