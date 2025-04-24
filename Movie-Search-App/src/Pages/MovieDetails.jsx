import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
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
  } else {
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
      />
      <p>{movie.Plot}</p>
      <p>{movie.Genre}</p>
      <p>{movie.Released}</p>
      <p>{movie.Runtime}</p>
      <button onClick={() => navigate("/")}>← Close</button>
    </div>
  );
}
