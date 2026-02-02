import { useNavigate } from "react-router-dom";
import styles from "./Movies.module.css";
import type { Movie } from "./types/Movie";
import { useAppDispatch } from "../redux/store";
import { toggleFavourite } from "../favourites/favouritesSlice";
type MovieCardProps = {
  movie: Movie;
  priority?: boolean;
  showRemoveFromFavourites?: boolean;
};
export default function MovieCard({
  movie,
  priority = false,
  showRemoveFromFavourites = false,
}: MovieCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <article
      className={styles.movieCard}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      {showRemoveFromFavourites ? (
        <button
          className={styles.movieCardFavButton}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(toggleFavourite(Number(movie.id)));
          }}
        >
          Удалить из избранного
        </button>
      ) : null}
      <span
        className={`${styles.movieCardRating} ${
          movie.rating > 8
            ? styles.movieCardRatingHigh
            : styles.movieCardRatingLow
        }`}
      >
        {movie.rating.toFixed(1)}
      </span>
      <img
        className={styles.movieCardImg}
        src={movie.img}
        alt={movie.title}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        width={280}
        height={420}
      />
      <div className={styles.movieCardInfo}>
        <p className={styles.movieCardTitle}>{movie.title}</p>
        <p className={styles.movieCardYear}>{movie.year}</p>
      </div>
    </article>
  );
}
