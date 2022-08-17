import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    search: searchReducer,
  },
});
