import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../types/Types";
import { API_URL } from "../../constant/Constant";
import { useEffect, useState } from "react";

const AboutFilm = () => {
  const { name } = useParams();
  const [film, setFilm] = useState<Film | null>(null); // Single movie
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

      setFilm(data as Film); // Update state with the movie details
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
    <section className="">
      <div className="">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : film ? (
          <div className="p-6 shadow-sm flex flex-col md:flex-row gap-5 items-center md:items-start px-9 text-wrap">
            {/* Check if the Poster exists before rendering */}
            {film.Poster ? (
              <img
                src={film.Poster}
                alt={`${film.Title} poster`}
                className="w-full max-w-xs shadow-myShadow"
              />
            ) : (
              <p>No poster available</p>
            )}
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-semibold">{film.Title}</h2>
              <div className="py-2 flex gap-5">
                {/* IMDb Rating Start */}
                <div>
                  <p className="font-bold text-[#ffffff7a]">IMDb RATING</p>
                  <p className="text-xl flex">
                    <i className="fa solid fa-star pr-1 text-yellow-300"></i>
                    {film.imdbRating === "N/A" ? (
                      <span>N/A</span>
                    ) : (
                      <span>
                        <strong>{film.imdbRating}</strong>/10
                      </span>
                    )}
                  </p>
                </div>

                {/* IMDb Rating End */}
                <div>
                  <p className="font-bold text-[#ffffff7a]">IMDb Votes</p>
                  <p className="text-xl">{film.imdbVotes || "N/A"}</p>
                </div>

                <div>
                  <p className="font-bold text-[#ffffff7a]">Rated</p>
                  <p className="text-xl">{film.Rated || "N/A"}</p>
                </div>
              </div>
              <p>
                <span className="font-bold">Released:</span>{" "}
                {film.Released || "N/A"}
              </p>
              <p>
                <span className="font-bold">Runtime:</span>{" "}
                {film.Runtime || "N/A"}
              </p>
              <p>
                <span className="font-bold">Genre:</span> {film.Genre || "N/A"}
              </p>
              <p>
                <span className="font-bold">Director:</span>{" "}
                {film.Director || "N/A"}
              </p>
              <p>
                <span className="font-bold">Actors:</span>{" "}
                {film.Actors || "N/A"}
              </p>
              <p>
                <span className="font-bold">Country:</span>{" "}
                {film.Country || "N/A"}
              </p>
              <p>
                <span className="font-bold">Langauge:</span>{" "}
                {film.Language || "N/A"}
              </p>
              <p className="md:w-[34rem]">
                <span className="font-bold">Plot:</span>{" "}
                {film.Plot || "No plot available"}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-4 py-2 flex justify-center"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default AboutFilm;
