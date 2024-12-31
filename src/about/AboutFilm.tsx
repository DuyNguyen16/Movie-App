import { Link, useParams } from "react-router-dom";
import { Movie } from "../types/Types";
import { API_URL } from "../constant/Constant";
import { useEffect, useState } from "react";

const AboutFilm = () => {
  const { name } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null); // Single movie
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = async () => {
    try {
      setError(null); // Clear any previous errors

      // Fetch movie details using the name parameter
      const response = await fetch(`${API_URL}&t=${name}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
      }

      setMovie(data as Movie); // Update state with the movie details
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  useEffect(() => {
    if (name) {
      fetchMovie();
    }
  }, [name]);

  return (
    <div>
      <Link
        to={`/`}
        className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-auto py-1"
      >
        <button className="w-full">Back</button>
      </Link>
      <div>
        <h1 className="text-xl font-bold">About: {name}</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : movie ? (
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
            <img src={movie.Poster} alt={`${movie.Title} poster`} className="w-full max-w-xs" />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AboutFilm;
