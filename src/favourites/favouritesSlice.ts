"use strict";
import { createSlice } from "@reduxjs/toolkit";
import type { FavouritesState } from "./types/FavouritesState";

const favouritesStorageKey = "favourites";

const loadFavourites = (): number[] => {
  try {
    const raw = localStorage.getItem(favouritesStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((id) => Number(id)).filter((id) => Number.isFinite(id))
      : [];
  } catch {
    return [];
  }
};

const saveFavourites = (ids: number[]) => {
  try {
    localStorage.setItem(favouritesStorageKey, JSON.stringify(ids));
  } catch {
    // ignore write errors
  }
};

const initialState: FavouritesState = {
  ids: loadFavourites(),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourite(state, action) {
      const id = Number(action.payload);
      if (!Number.isFinite(id)) return;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
        saveFavourites(state.ids);
      }
    },
    removeFavourite(state, action) {
      const id = Number(action.payload);
      if (!Number.isFinite(id)) return;
      state.ids = state.ids.filter((item) => item !== id);
      saveFavourites(state.ids);
    },
    toggleFavourite(state, action) {
      const id = Number(action.payload);
      if (!Number.isFinite(id)) return;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id);
      } else {
        state.ids.push(id);
      }
      saveFavourites(state.ids);
    },
  },
});

export const { addToFavourite, removeFavourite, toggleFavourite } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
