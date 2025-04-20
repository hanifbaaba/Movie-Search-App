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

  return (
    <div>
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search For Movies"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="input-movie"
        />
        <button onClick={getMovieData}>Search</button>
      </div>

      <div className="movie-container">
        {movie?.map((m) => (
          <div className="movie-card" key={m.imdbID}>
            {/* <img src={m.Poster} alt={`${m.Title} poster`} /> */}
            <img
              src={
                m.Poster !== "N/A"
                  ? m.Poster
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={`${m.Title} poster`}
            />

            <h2>{m.Title}</h2>
            <p>{m.Year}</p>
          </div>
        ))}
      </div>

      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}
