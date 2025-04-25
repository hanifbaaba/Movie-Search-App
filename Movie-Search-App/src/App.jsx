import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SearchPage from "./Pages/SearchPage";
import MovieDetails from "./Pages/MovieDetails";

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="title-name">Movie Search App</h1>
      <Routes>
        <>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}
