// thư viên viết redux
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// thư viên connect redux vs react
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";


import {rootReducer } from "./rootReducer";

/**
 * tao store lưu trữ cho redux
 * Nhân 2 Tham số:
 *   reducer : 
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      imutableCheck: false,
    }),
});



const { dispatch } = store;

const selector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, selector, useDispatch };
