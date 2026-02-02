import { useQuery } from "@tanstack/react-query";

import MovieCard from "../movies/MovieCard";
import { getMovies } from "../movies/api";
import type { Movie } from "../movies/types/Movie";
import styles from "../movies/Movies.module.css";
import { useAppSelector, type RootState } from "../redux/store";

function FavouritesList() {
  const { ids } = useAppSelector((store: RootState) => store.favourites);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: ({ signal }) => getMovies({ signal }),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {(error as Error).message}</div>;

  const idsSet = new Set(ids.map((id) => Number(id)));
  const favouriteMovies = data.filter((movie) =>
    idsSet.has(Number(movie.id)),
  );

  return (
    <ul className={styles.moviesList}>
      {favouriteMovies.length === 0 ? (
        <li className={styles.moviesListEmpty}>Избранное пусто</li>
      ) : (
        favouriteMovies.map((movie, index) => (
          <li key={movie.id} className={styles.moviesListItem}>
            <MovieCard
              movie={movie}
              priority={index < 2}
              showRemoveFromFavourites
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default FavouritesList;
