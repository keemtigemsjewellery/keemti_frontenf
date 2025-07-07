import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: any = {
  addressList: [],
  checkoutAddress: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    getCheckoutAddressAction: (state, action) => {
      state.checkoutAddress = action.payload;
    },
    setCheckoutAddressAction: (state, action) => {
      state.checkoutAddress = state.checkoutAddress.map((address: any) => {
        if (address.id === action.payload) {
          return { ...address, checked: true };
        } else {
          return { ...address, checked: false };
        }
      });
    },
  },
});

export const {
  setAddressList,
  getCheckoutAddressAction,
  setCheckoutAddressAction,
} = ProductSlice.actions;

export const getAddressData = (state: RootState) => state.address;

export default ProductSlice.reducer;
