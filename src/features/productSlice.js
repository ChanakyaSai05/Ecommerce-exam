import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    set_proData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const { set_proData } = productSlice.actions;
export const selectProduct = (state) => state.product;
export default productSlice.reducer;
