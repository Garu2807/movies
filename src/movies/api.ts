"use strict";

import type { Movie } from "./types/Movie";

export const getMovies = async (params?: {
  titleLike?: string;
  signal?: AbortSignal;
}): Promise<Movie[]> => {
  const url = new URL("http://localhost:4000/movies");
  const titleLike = params?.titleLike?.trim();
  if (titleLike) url.searchParams.set("title_like", titleLike);
  const res = await fetch(url.toString(), { signal: params?.signal });
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data;
};

export const getMovieById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/movies/${id}`);
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
};
