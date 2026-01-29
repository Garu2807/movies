import { useQuery } from "@tanstack/react-query";
import styles from "./Movies.module.scss";
import type { Movie } from "./types/Movie";
import MovieCard from "./MovieCard";
import { getMovies } from "./api";
import useDebounce from "../hooks/useDebounce";

type MoviesListProps = {
  query: string;
};

function MoviesList({ query }: MoviesListProps) {
  const debouncedQuery = useDebounce(query, 400);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: ({ signal }) => getMovies({ signal }),
    staleTime: 1000 * 60 * 5,
  });

  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredMovies =
    normalizedQuery.length === 0
      ? data
      : data.filter((movie) =>
          movie.title.toLowerCase().includes(normalizedQuery),
        );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {(error as Error).message}</div>;
  return (
    <div className={styles.container}>
      {filteredMovies.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено</p>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
}

export default MoviesList;
