import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      const data = await response.json();
      setMovie(data);
    }

    fetchMovieData();
  }, [movieId, API_KEY]);

  if (!movie) {
    return <p className="loading-movie">Loading movie details...</p>;
  }

  return (
    <div className="movie-details-container">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
        alt={`${movie.Title} poster`}
        className="movie-details-poster"
      />
      <div className="movie-details-info">
        <h2 className="movie-details-title">{movie.Title}</h2>
        <p className="movie-details-plot">
          <span className="info-label">Plot:</span> {movie.Plot}
        </p>
        <p className="movie-details-genre">
          <span className="info-label">Genre:</span> {movie.Genre}
        </p>
        <p className="movie-details-released">
          <span className="info-label">Released:</span> {movie.Released}
        </p>
        <p className="movie-details-runtime">
          <span className="info-label">Runtime:</span> {movie.Runtime}
        </p>
        <p className="movie-details-director">
          <span className="info-label">Director:</span> {movie.Director}
        </p>
        <p className="movie-details-actors">
          <span className="info-label">Actors:</span> {movie.Actors}
        </p>
        <p className="movie-details-language">
          <span className="info-label">Language:</span> {movie.Language}
        </p>
        <p className="movie-details-country">
          <span className="info-label">Country:</span> {movie.Country}
        </p>
        <p className="movie-details-rating">
          <span className="info-label">IMDb Rating:</span> {movie.imdbRating} /
          10
        </p>
        <button onClick={() => navigate("/")} className="movie-details-button">
          ← Back to Search
        </button>
      </div>
    </div>
  );
}
