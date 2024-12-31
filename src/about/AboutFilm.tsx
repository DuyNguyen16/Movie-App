import { Link, useParams } from "react-router-dom";
import { Movie } from "../types/Types";
import { API_URL } from "../constant/Constant";
import { useEffect, useState } from "react";

const AboutFilm = () => {
  const { name } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null); // Single movie
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetailed = async () => {
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
      fetchMovieDetailed();
    }
  }, [name]);

  return (
    <div>
      <div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : movie ? (
          <div className="p-6 shadow-sm flex flex-row gap-5">
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="w-full max-w-xs"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-semibold">{movie.Title}</h2>
              <div className="border p-2">
                {/* IMDb Rating Start */}
                <div>
                  <p className="font-bold text-[#ffffff7a] ">IMDb RATING</p>
                  <p className="text-xl">
                    <i className="fa solid fa-star pr-1 text-yellow-300"></i>
                    <span className="font-bold">
                      {movie.Ratings[0].Value.split("/")[0]}
                    </span>
                    /{movie.Ratings[0].Value.split("/")[1]}
                  </p>
                </div>
                
                {/* IMDb Rating End */}
              </div>
              <p>
                <span className="font-bold">Year:</span> {movie.Year}
              </p>
              <p>
                <span className="font-bold">Genre:</span> {movie.Genre}
              </p>
              <p>
                <span className="font-bold">Director:</span> {movie.Director}
              </p>
              <p>
                <span className="font-bold">Actors:</span> {movie.Actors}
              </p>
              <p>Plot: {movie.Plot}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Link
        to={`/`}
        className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-auto py-1"
      >
        <button className="">Back</button>
      </Link>
    </div>
  );
};

export default AboutFilm;
