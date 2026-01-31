import { useNavigate } from "react-router-dom";
import styles from "./Movies.module.css";
import type { Movie } from "./types/Movie";
type MovieCardProps = {
  movie: Movie;
  priority?: boolean;
};
export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const navigate = useNavigate();
  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <span
        className={`${styles.rating} ${
          movie.rating > 8 ? styles.ratingHigh : styles.ratingLow
        }`}
      >
        {movie.rating.toFixed(1)}
      </span>
      <img
        className={styles.img}
        src={movie.img}
        alt={movie.title}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "low"}
        decoding="async"
        width={280}
        height={420}
      />
      <div className={styles.info}>
        <p className={styles.title}>{movie.title}</p>
        <p className={styles.year}>{movie.year}</p>
      </div>
    </article>
  );
}
