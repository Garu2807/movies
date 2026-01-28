import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./Movies.module.scss";
import type { Movie } from "./types/Movie";
import MovieCard from "./MovieCard";
import { getData } from "./api";
function MoviesList() {
  const { data = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: getData,
  });
  return (
    <div className={styles.container}>
      {data.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesList;
