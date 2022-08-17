import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    set_searchData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const { set_searchData } = searchSlice.actions;
export const selectSearch = (state) => state.search;
export default searchSlice.reducer;
