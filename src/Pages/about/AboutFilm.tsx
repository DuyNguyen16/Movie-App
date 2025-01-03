import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../types/Types";
import { API_URL, mainContext } from "../../constant/Constant";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

const AboutFilm = () => {
  const context = useContext(mainContext);
  const { name } = useParams();
  const [film, setFilm] = useState<Film | null>(null); // Single movie
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // Track if movie is bookmarked

  const navigate = useNavigate();

  const fetchMovieDetailed = useCallback(async () => {
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
      checkIfBookmarked(data); // Check if it's already bookmarked
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [name]); // Dependencies of the fetch logic

  useEffect(() => {
    if (name) {
      fetchMovieDetailed();
    }
  }, [name, fetchMovieDetailed]);

  // Check if the film is already bookmarked by the user
  const checkIfBookmarked = async (film: Film) => {
    if (context.user?.email) {
      const bookmarkRef = doc(db, "bookmarks", `${context.user.email}-${film.Title}`);
      const bookmarkDoc = await getDoc(bookmarkRef);
      setIsBookmarked(bookmarkDoc.exists());
    }
  };

  // Add bookmark
  const handleBookmark = async () => {
    if (!context.user?.email) {
      setShowPopup(true);
      return;
    }

    if (film) {
      try {
        // Reference to the user's bookmarks collection
        const bookmarkRef = doc(db, "bookmarks", `${context.user.email}-${film.Title}`);

        // Save the movie details to Firestore
        await setDoc(bookmarkRef, {
          title: film.Title,
          poster: film.Poster || "No poster available",
          type: film.Type || "N/A",
          year: film.Year || "N/A",
          user: context.user.email,
        });

        setIsBookmarked(true); // Update the state
        toast.success(`Bookmarked: ${film.Title}`);
      } catch (err) {
        console.error("Error saving bookmark:", err);
        toast.error("Failed to bookmark the movie. Please try again.");
      }
    }
  };

  // Remove bookmark
  const handleRemoveBookmark = async () => {
    if (!context.user?.email) {
      setShowPopup(true);
      return;
    }

    if (film) {
      try {
        // Reference to the user's bookmarks collection
        const bookmarkRef = doc(db, "bookmarks", `${context.user.email}-${film.Title}`);

        // Delete the bookmark from Firestore
        await deleteDoc(bookmarkRef);

        setIsBookmarked(false); // Update the state
        toast.info(`Removed Bookmark: ${film.Title}`);
      } catch (err) {
        console.error("Error removing bookmark:", err);
        toast.error("Failed to remove the bookmark. Please try again.");
      }
    }
  };

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
                <span className="font-bold">Language:</span>{" "}
                {film.Language || "N/A"}
              </p>
              <p className="md:w-[34rem]">
                <span className="font-bold">Plot:</span>{" "}
                {film.Plot || "No plot available"}
              </p>
              <div className="flex w-full">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-emerald-600 rounded-md hover:bg-emerald-800 duration-150 text-white font-bold mt-4 py-2 flex justify-center items-center"
                  style={{ flex: 8 }}
                >
                  Back
                </button>

                {/* Conditional Bookmark/Remove Bookmark Button */}
                {!isBookmarked ? (
                  <button
                    onClick={handleBookmark}
                    className="bg-orange-500 hover:bg-orange-700 duration-150 rounded-md mt-4 ml-2 flex justify-center items-center"
                    style={{ flex: 2}}
                  >
                    <i className="fa regular fa-bookmark"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveBookmark}
                    className="bg-red-500 hover:bg-red-700 duration-150 rounded-md mt-4 ml-2 flex justify-center items-center"
                    style={{ flex: 2}}
                  >
                    <i className="fa solid fa-trash"></i>
                  </button>
                )}

                {/* Popup Message */}
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#1C1C20] rounded-lg py-16 w-3/4 max-w-sm text-center">
                      <p className="text-xl">Please Sign In to bookmark</p>
                      <div className="flex gap-2 justify-center pt-10">
                        <button
                          onClick={() => setShowPopup(false)} // Close the popup
                          className="bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 rounded-sm duration-150"
                        >
                          OK
                        </button>
                        <Link to={"/user/login"} className="bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-sm duration-150">Sign in</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
