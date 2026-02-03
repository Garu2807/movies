import MoviesList from "./movies/MoviesList";
import MoviesPage from "./movies/MoviePage";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { useState } from "react";
import "./App.css";
import FavouritesList from "./favourites/FavouritesList";
function App() {
  const [query, setQuery] = useState("");


  return (
    <>
      <NavBar searchTerm={query} onSearchChange={(value) => setQuery(value)} />
      <main>
        <section aria-label="Список фильмов">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route
              path="/movies"
              element={<MoviesList query={query} />}
            />
            <Route path="/movies/:id" element={<MoviesPage />} />
            <Route path="/favourites" element={<FavouritesList />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
