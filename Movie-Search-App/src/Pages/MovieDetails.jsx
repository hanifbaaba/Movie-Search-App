import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  async function movieData() {
    const movies = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
    );
    const data = await movies.json();
    setMovie(data);
  }

  useEffect(() => {
    movieData();
  }, [movieId]);
  console.log(movieId);
  if (movie === null) {
    return <p>Loading movie....</p>;
  }

  return (
    <div>
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={`${movie.Title} poster`}
        className="movie-image"
      />
      <p className="movie-plot">{movie.Plot}</p>
      <p className="movie-genre">{movie.Genre}</p>
      <p className="movie-released">{movie.Released}</p>
      <p className="movie-runtime">{movie.Runtime}</p>
      <button onClick={() => navigate("/")} className="movie-button">
        ← Close
      </button>
    </div>
  );
}
