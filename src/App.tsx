import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MoviesList from "./movies/MoviesList";
import MoviesPage from "./movies/MoviePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/:id" element={<MoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
