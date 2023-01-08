import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    set_data: (state, action) => {
      state = [...state, action.payload];
      return state;
    },
    remove_data: (state, action) => {
      let state1 = [...state];
      state1.splice(action.payload, 1);
      return state1;
    },
    empty_data: (state, action) => {
      return [];
    },
    inc_quantity: (state, action) => {
      let state1 = state.map((item) =>
        item.id === action.payload.pro_id
          ? {
              ...item,
              quantity: item.quantity + 1,
              list_price: item.list_price + action.payload.base_price,
            }
          : item
      );
      return state1;
    },
    dec_quantity: (state, action) => {
      let state1 = state.map((item) =>
        item.id === action.payload.pro_id
          ? {
              ...item,
              quantity: item.quantity - 1,
              list_price: item.list_price - action.payload.base_price,
            }
          : item
      );
      return state1;
    },
  },
});
export const { set_data, remove_data, empty_data, inc_quantity, dec_quantity } =
  userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
