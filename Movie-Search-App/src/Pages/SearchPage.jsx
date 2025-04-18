import { useEffect, useState } from "react";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState([]);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;

  async function getMovieData() {
    if (search.length <= 2) {
      setError("Please type at least 3 characters");
      return;
    }
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Couldn't find movie details");
    }
    const data = await res.json();
    setMovie(data.Search);
  }

  console.log(movie);
  return (
    <div className="movie-container">
      <input
        type="search"
        placeholder="Search For Movies"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="input-movie"
      />
      <button onClick={getMovieData}> Search</button>
      <div className="movie-card">
        {movie?.map((m) => (
          <div key={m.imdbID}>
            <img src={m.Poster} />
            <h2>{m.Title}</h2>
            <p>{m.Year}</p>
          </div>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
