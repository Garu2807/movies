import { useState } from "react";
import MoviesList from "./movies/MoviesList";
import MoviesPage from "./movies/MoviePage";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./navbar/NavBar";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <NavBar searchTerm={query} onSearchChange={(value) => setQuery(value)} />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" replace />} />
        <Route path="/movies" element={<MoviesList query={query} />} />
        <Route path="/movies/:id" element={<MoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
