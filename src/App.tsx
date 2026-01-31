import MoviesList from "./movies/MoviesList";
import MoviesPage from "./movies/MoviePage";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Filters from "./filters/Filters";
import useFilters from "./hooks/useFilters";
import { useState } from "react";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  const { filters, setFilters } = useFilters();

  return (
    <>
      <NavBar searchTerm={query} onSearchChange={(value) => setQuery(value)} />
      <main>
        <h1>Фильмы</h1>
        <section aria-label="Фильтры">
          <Filters filters={filters} onChange={setFilters} />
        </section>
        <section aria-label="Список фильмов">
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route
              path="/movies"
              element={<MoviesList query={query} filters={filters} />}
            />
            <Route path="/movies/:id" element={<MoviesPage />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
