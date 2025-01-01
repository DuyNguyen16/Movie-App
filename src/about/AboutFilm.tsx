import { Link, useParams } from "react-router-dom";
import { Movie } from "../types/Types";
import { API_URL } from "../constant/Constant";
import { useEffect, useState } from "react";

const AboutFilm = () => {
  const { name } = useParams();
  const [film, setFilm] = useState<Movie | null>(null); // Single movie
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

      setFilm(data as Movie); // Update state with the movie details
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
        ) : film ? (
          <div className="p-6 shadow-sm flex flex-col md:flex-row gap-5 items-center md:items-start px-9 text-wrap">
            <img
              src={film.Poster}
              alt={`${film.Title} poster`}
              className="w-full max-w-xs shadow-myShadow"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-semibold">{film.Title}</h2>
              <div className="py-2 flex gap-5">
                {/* IMDb Rating Start */}
                <div>
                  <p className="font-bold text-[#ffffff7a] ">IMDb RATING</p>
                  <p className="text-xl">
                    <i className="fa solid fa-star pr-1 text-yellow-300"></i>
                    <span className="font-bold">
                      {film.Ratings[0].Value.split("/")[0]}
                    </span>
                    /{film.Ratings[0].Value.split("/")[1]}
                  </p>
                </div>

                {/* IMDb Rating End */}
                <div>
                  <p className="font-bold text-[#ffffff7a] ">IMDb Votes</p>
                  <p className="text-xl">{film.imdbVotes}</p>
                </div>

                <div>
                  <p className="font-bold text-[#ffffff7a] ">Rated</p>
                  <p className="text-xl">{film.Rated}</p>
                </div>
              </div>
              <p>
                <span className="font-bold">Released:</span> {film.Released}
              </p>
              <p>
                <span className="font-bold">Runtime:</span> {film.Runtime}
              </p>
              <p>
                <span className="font-bold">Genre:</span> {film.Genre}
              </p>
              <p>
                <span className="font-bold">Director:</span> {film.Director}
              </p>
              <p>
                <span className="font-bold">Actors:</span> {film.Actors}
              </p>
              <p>
                <span className="font-bold">Country:</span> {film.Country}
              </p>
              <p className="md:w-[34rem]">
                <span className="font-bold">Plot:</span> {film.Plot}
              </p>
              <Link
                to={`/`}
                className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-4 py-2 flex justify-center"
              >
                <button className="">Back</button>
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AboutFilm;
