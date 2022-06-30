import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import searchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=77eec42b";

const movie1 = {
  Title: "The Martian",
  Year: "2015",
  imdbID: "tt3659388",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("martian");
  }, []);

  return (
    <div className="app">
      <h1>movieExplore</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />

        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchQuery)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {" "}
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
