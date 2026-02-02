import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./Movies.module.css";
import { getMovieById } from "./api";
import type { Movie } from "./types/Movie";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleFavourite } from "../favourites/favouritesSlice";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ids = useAppSelector((store) => store.favourites.ids);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: ({ queryKey }) => getMovieById(queryKey[1] as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {(error as Error).message}</p>;
  if (!movie) {
    navigate("/movies");
    return null;
  }
  const isFavourite = ids.includes(Number(movie.id));

  return (
    <section className={styles.moviePage}>
      <div className={styles.moviePagePosterWrap}>
        <img
          src={movie.img}
          alt={movie.title}
          className={styles.moviePagePoster}
        />
      </div>
      <div className={styles.moviePageContent}>
        <div className={styles.moviePageHeaderRow}>
          <h1 className={styles.moviePageTitle}>{movie.title}</h1>
          <button
            className={`${styles.moviePageFavButton} ${
              isFavourite ? styles.moviePageFavButtonActive : ""
            }`}
            type="button"
            aria-pressed={isFavourite}
            onClick={() => dispatch(toggleFavourite(Number(movie.id)))}
          >
            {isFavourite ? "В избранном" : "В избранное"}
          </button>
        </div>
        <div className={styles.moviePageInfo}>
          <p className={styles.moviePageInfoItem}>{movie.rating}</p>
          <p className={styles.moviePageInfoItem}>{movie.genre}</p>
          <p className={styles.moviePageInfoItem}>{movie.year}</p>
        </div>
        <p className={styles.moviePageDesc}>{movie.dscr}</p>
      </div>
    </section>
  );
}
