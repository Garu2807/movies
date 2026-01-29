import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./Movies.module.scss";
import { getMovieById } from "./api";
import type { Movie } from "./types/Movie";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useQuery<Movie>({
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


  return (
    <section className={styles.moviePage}>
      <img src={movie.img} alt={movie.title} className={styles.movieImage} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.year}</p>
      </div>
    </section>
  );
}