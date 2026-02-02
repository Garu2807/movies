import { useQuery } from "@tanstack/react-query";
import styles from "./Movies.module.css";
import type { Movie } from "./types/Movie";
import MovieCard from "./MovieCard";
import { getMovies } from "./api";
import useDebounce from "../hooks/useDebounce";
import type { FiltersState } from "../hooks/useFilters";
import Filters from "../filters/Filters";
import useFilters from "../hooks/useFilters";

type MoviesListProps = {
  query: string;
};

const toNumber = (value: string): number | undefined => {
  if (value.trim() === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
};

const parseYearRange = (value: string): { from?: number; to?: number } => {
  if (!value) return {};
  const [fromRaw, toRaw] = value.split("-");
  const from = Number(fromRaw);
  const to = Number(toRaw);
  return {
    from: Number.isFinite(from) ? from : undefined,
    to: Number.isFinite(to) ? to : undefined,
  };
};

function MoviesList({ query}: MoviesListProps) {
  const debouncedQuery = useDebounce(query, 400);
  const { filters, setFilters } = useFilters();
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
  const { from: yearFrom, to: yearTo } = parseYearRange(filters.yearRange);
  const ratingFrom = toNumber(filters.ratingFrom);

  const filteredMovies = data.filter((movie) => {
    if (
      normalizedQuery &&
      !movie.title.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }
    if (filters.genre && movie.genre !== filters.genre) return false;
    if (yearFrom !== undefined && movie.year < yearFrom) return false;
    if (yearTo !== undefined && movie.year > yearTo) return false;
    if (ratingFrom !== undefined && movie.rating < ratingFrom) return false;
    return true;
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {(error as Error).message}</div>;
  return (
    <>
      <h1>Фильмы</h1>
      <section aria-label="Фильтры">
        <Filters filters={filters} onChange={setFilters} />
      </section>
      <div className={styles.moviesList}>
        {filteredMovies.length === 0 ? (
          <p className={styles.moviesListEmpty}>Ничего не найдено</p>
        ) : (
          filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} priority={index < 2} />
          ))
        )}
      </div>
    </>
  );
}

export default MoviesList;
