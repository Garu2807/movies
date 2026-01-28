"use strict";
export const getData = async () => {
  const res = await fetch("http://localhost:4000/movies");
  return res.json();
};

export const getMovieById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/movies/${id}`);
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
};
