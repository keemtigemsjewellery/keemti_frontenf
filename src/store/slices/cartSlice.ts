import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { cartSliceModel } from "utils/interface/reduxSlice";

const initialState: cartSliceModel = {
  cartProducts: [],
  allCoupons: null,
  totalAmount: 0,
  discountAmount: 0,
  couponAmount: 0,
  adminShippingMaxValue: 0,
  adminShippingMinValue: 0,
  adminShippingAmount: 0,
  adminFlatShippingCharge: 0,
  adminPercentageShippingCharge: 0,
  shippingType: "flat",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getAllCartProductsAction: (state, action) => {
      state.cartProducts = action.payload;
    },
    addProductToCartAction: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    removeProductFromCartAction: (state, action) => {
      state.cartProducts =
        state.cartProducts &&
        state.cartProducts.filter(
          (product) => product.id !== action.payload.id
        );
      state.totalAmount = state.totalAmount - action.payload.amount;

      // Discount amount logic
      // let discountPrice = 0;

      // state?.cartProducts.forEach((cartItem) => {
      //   const amountDiff = +cartItem.actualPrice - +cartItem.offerPrice;
      //   discountPrice = +discountPrice + amountDiff;
      // });

      // state.discountAmount = discountPrice || 0;
    },
    onCheckoutEmptyCartAction: (state) => {
      state.cartProducts = [];
      state.allCoupons = null;
      state.totalAmount = 0;
      state.discountAmount = 0;
      state.couponAmount = 0;
      state.adminShippingMaxValue = 0;
      state.adminShippingMinValue = 0;
      state.adminShippingAmount = 0;
      state.adminFlatShippingCharge = 0;
      state.adminPercentageShippingCharge = 0;
      state.shippingType = "flat";
    },
    getTotalAmountAction: (state) => {
      let amount: number = 0;

      state?.cartProducts.forEach((cartItem) => {
        amount = +amount + +cartItem.actualPrice;
      });

      state.totalAmount = amount;
    },
    getDiscountAmountAction: (state) => {
      let discountPrice = 0;

      state?.cartProducts.forEach((cartItem) => {
        const amountDiff = +cartItem.actualPrice - +cartItem.offerPrice;
        discountPrice = +discountPrice + amountDiff;
      });

      state.discountAmount = discountPrice || 0;
    },
    setCouponAmountAction: (state, action) => {
      state.couponAmount = action.payload;
    },
    getAllCouponsAction: (state, action) => {
      state.allCoupons = action.payload;
    },
    setAdminShippingValues: (state, action) => {
      state.adminShippingMaxValue = + (action.payload.shippingMax ?? 0);
      state.adminShippingMinValue = +(action.payload.shippingMin ?? 0);
      state.adminShippingAmount = +(action.payload.free_shipping_amount ?? 0);
      state.adminFlatShippingCharge = +(action.payload.shipping_charges ?? 0);
      state.adminPercentageShippingCharge =
        +(action.payload.shipping_percentage_charges ?? 0);
      state.shippingType = action.payload.shippingType ?? "flat";
    },
    setNewCartValuesAction: (state, action) => {
      state.cartProducts =
        state.cartProducts &&
        state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              offerPrice: action.payload.latestOfferPrice,
              actualPrice: action.payload.latestActualPrice,
            };
          } else {
            return product;
          }
        });

      state.totalAmount = state.totalAmount - action.payload.latestOfferPrice;

      // Discount price
      // let discountPrice = 0;

      // state?.cartProducts.forEach((cartItem) => {
      //   const amountDiff = +cartItem.actualPrice - +cartItem.offerPrice;
      //   discountPrice = +discountPrice + amountDiff;
      // });

      // state.discountAmount = discountPrice || 0;

      state.couponAmount = 0;
    },
  },
});

export const {
  getAllCartProductsAction,
  addProductToCartAction,
  removeProductFromCartAction,
  onCheckoutEmptyCartAction,
  getTotalAmountAction,
  getDiscountAmountAction,
  setCouponAmountAction,
  getAllCouponsAction,
  setAdminShippingValues,
  setNewCartValuesAction,
} = cartSlice.actions;

export const getCartProductsData = (state: RootState) => state.cart;

export default cartSlice.reducer;
