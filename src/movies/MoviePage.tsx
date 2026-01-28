import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./Movies.module.scss";
import { getMovieById } from "./api";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Загрузка...</p>;

  if (isError || !movie)
    return (
      <div>
        <p>Фильм не найден</p>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    );

  return (
    <section className={styles.moviePage}>
      <img src={movie.img} alt={movie.title} className={styles.movieImage} />

      <div>
        <h1>{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.genre}</p>
        <p>⭐ {movie.rating}</p>
      </div>
    </section>
  );
}
