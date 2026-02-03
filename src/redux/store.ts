"use strict";
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import favouritesReducer from '../favourites/favouritesSlice';

const store = configureStore({
  reducer: { favourites: favouritesReducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
