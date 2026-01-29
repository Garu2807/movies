"use strict";

import type { Movie } from "./types/Movie";

export const getMovies = async (params?: {
  q?: string;
  signal?: AbortSignal;
}): Promise<Movie[]> => {
  const url = new URL("http://localhost:4000/movies");
  const q = params?.q?.trim();
  if (q) url.searchParams.set("q", q);
  const res = await fetch(url.toString(), { signal: params?.signal });
  if (!res.ok) throw new Error("Failed to fetch movies");
  console.log(q, res);
  return res.json();
};

export const getMovieById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/movies/${id}`);
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
};
