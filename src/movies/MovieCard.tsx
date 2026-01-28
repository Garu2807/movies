import { useNavigate } from "react-router-dom";
import styles from "./Movies.module.scss";
import type { Movie } from "./types/Movie";
type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  return (
    <article
      className={styles.card}
      onClick={() => navigate(`${movie.id}`)}
    >
      <img className={styles.img} src={movie.img} alt={movie.title} />
      <h5>{movie.title}</h5>
      <p>{movie.year}</p>
    </article>
  );
}
