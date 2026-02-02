"use strict";
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import favouritesReducer from '../favourites/favouritesSlice';

const store = configureStore({
  reducer: { favourites: favouritesReducer },
});

// для правильной типизации будем использовать useAppDispatch вместоuseDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

/* Какой тип будет у функции store.getState -> тот и будет типа RootState */
export type RootState = ReturnType<typeof store.getState>;

export default store;
