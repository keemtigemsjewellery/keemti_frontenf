import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: any = {
  allOrders: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    getAllOrdersAction: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const { getAllOrdersAction } = OrderSlice.actions;

export const getOrdersData = (state: RootState) => state.orders;

export default OrderSlice.reducer;
