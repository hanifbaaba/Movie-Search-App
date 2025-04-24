import { Link } from "react-router-dom";

import { useState } from "react";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");

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
    if (!data.Search) {
      setError("No results found");
      setMovie([]);
      return;
    }
    const detailedMovies = await Promise.all(
      data.Search.map(async (movie) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
        );
        return await res.json();
      })
    );

    setMovie(detailedMovies);
    setError("");
  }
  {
    // setMovie(data.Search);
  }
  const genres = [
    "Action",
    "Adventure",

    "Animation",

    "Biography",

    " Comedy",

    " Crime",

    "Documentary",

    " Drama",

    " Family",

    " Fantasy",

    " History",

    "Horror",

    "Music",

    " Musical",

    "Mystery",

    "Romance",

    " Sci-Fi",

    " Sport",

    "Thriller",

    "War",

    "Western",
  ];
  const filteredMovies =
    selectedGenre === ""
      ? movie
      : movie.filter(
          (m) =>
            m.Type === "movie" &&
            m.Genre?.toLowerCase().includes(selectedGenre.toLowerCase())
        );

  return (
    <div>
      <div className="search-bar">
        <select
          name="genre"
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">--Select a Genre--</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

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
          <Link to={`/movie/${m.imdbID}`} key={m.imdbID}>
            <div className="movie-card" key={m.imdbID}>
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
          </Link>
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
