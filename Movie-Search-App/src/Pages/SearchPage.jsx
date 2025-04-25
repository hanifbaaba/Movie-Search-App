import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [movie, setMovie] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;

  async function getMovieData() {
    if (search.length <= 2) {
      setError("Please type at least 3 characters");
      return;
    }

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Couldn't find movie details");

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
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    async function fetchDefaultMovies() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`
        );
        const data = await res.json();
        if (data.Search) {
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
      } catch (err) {
        setError(err.message);
      }
    }
    fetchDefaultMovies();
  }, [API_KEY]);

  const genres = [
    "",
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
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
            m.Genre?.split(", ")
              .map((g) => g.toLowerCase())
              .includes(selectedGenre.toLowerCase())
        );

  return (
    <div className="search-page-container">
      <div className="search-bar">
        <select
          name="genre"
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-select"
        >
          <option value="">-- All Genres --</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre || "All Genres"}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search For Movies"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="search-input"
        />
        <button
          onClick={getMovieData}
          disabled={search.length <= 2}
          className="search-button"
        >
          Search
        </button>
      </div>

      <div className="movie-grid">
        {filteredMovies.map((m) => {
          const rating = Number(m.imdbRating);
          const starCount = !isNaN(rating) ? Math.round(rating / 2) : 0;

          return (
            <Link
              to={`/movie/${m.imdbID}`}
              key={m.imdbID}
              className="movie-link"
            >
              <div className="movie-card">
                <img
                  src={
                    m.Poster !== "N/A"
                      ? m.Poster
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={`${m.Title} poster`}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h2 className="movie-title">{m.Title}</h2>
                  <p className="movie-year">{m.Year}</p>
                  <p className="movie-rating">
                    ⭐{"⭐".repeat(starCount)}{" "}
                    <span className="rating-value">({m.imdbRating}/10)</span>
                  </p>
                  <p className="movie-director">Dir: {m.Director}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
