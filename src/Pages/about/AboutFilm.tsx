import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../../types/Types";
import { API_URL, mainContext } from "../../constant/Constant";
import { useCallback, useContext, useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import { YOUTUBE_DATA_API } from "../../../../api/api";
import LoginModal from "../../Components/LoginModal";

const AboutFilm = () => {
  const context = useContext(mainContext);
  const { name } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const checkIfBookmarked = useCallback(
    async (film: Film) => {
      if (context.user?.email) {
        const bookmarkRef = doc(
          db,
          "bookmarks",
          `${context.user.email}-${film.Title}`
        );
        const bookmarkDoc = await getDoc(bookmarkRef);
        setIsBookmarked(bookmarkDoc.exists());
      }
    },
    [context.user?.email]
  );

  const fetchMovieDetailed = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}&t=${name}`);
      if (!response.ok) throw new Error("Failed to fetch movie details");

      const data = await response.json();
      if (data.Response === "False")
        throw new Error(data.Error || "Movie not found");

      setFilm(data as Film);
      checkIfBookmarked(data);
      fetchYouTubeTrailer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [name, checkIfBookmarked]);

  useEffect(() => {
    if (name) {
      fetchMovieDetailed();
      window.scrollTo(0, 0);
    }
  }, [name, fetchMovieDetailed]);

  const fetchYouTubeTrailer = useCallback(async (film: Film) => {
    const apiKey = YOUTUBE_DATA_API;
    const searchQuery = `${film.Title} official trailer`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const videoId = data.items?.[0]?.id?.videoId;
      setTrailerUrl(
        videoId ? `https://www.youtube.com/embed/${videoId}` : null
      );
    } catch (error) {
      console.error("Error fetching YouTube trailer:", error);
      setTrailerUrl(null);
    }
  }, []);

  const handleBookmark = async () => {
    if (!context.user?.email || !film) {
      setShowLoginModal(true); // Show the modal if the user is not logged in
      return;
    }

    try {
      const bookmarkRef = doc(
        db,
        "bookmarks",
        `${context.user.email}-${film.Title}`
      );
      await setDoc(bookmarkRef, {
        Title: film.Title,
        Poster: film.Poster || "No poster available",
        Type: film.Type || "N/A",
        Year: film.Year || "N/A",
        user: context.user.email,
      });

      setIsBookmarked(true);
      toast.success(`Bookmarked: ${film.Title}`);
    } catch (err) {
      console.error("Error saving bookmark:", err);
      toast.error("Failed to bookmark the movie. Please try again.");
    }
  };

  const handleRemoveBookmark = async () => {
    if (!context.user?.email || !film) {
      toast.error("Error occurred");
      return;
    }

    try {
      const bookmarkRef = doc(
        db,
        "bookmarks",
        `${context.user.email}-${film.Title}`
      );
      await deleteDoc(bookmarkRef);

      setIsBookmarked(false);
      toast.info(`Removed Bookmark: ${film.Title}`);
    } catch (err) {
      console.error("Error removing bookmark:", err);
      toast.error("Failed to remove the bookmark. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false); // Close the modal
  };

  return (
    <section className="lg:h-screen mb-12 myScreenTwo:mb-0" id="aboutFilm">
      <div className="flex flex-col myScreenTwo:flex-row shadow-myShadow">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : film ? (
          <>
            <div className="p-6 shadow-sm flex flex-col md:flex-row gap-5 items-center md:items-start px-9 text-wrap">
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
                  <span className="font-bold">Genre:</span>{" "}
                  {film.Genre || "N/A"}
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

                  {!isBookmarked ? (
                    <button
                      onClick={handleBookmark}
                      className="bg-orange-500 hover:bg-orange-700 duration-150 rounded-md mt-4 ml-2 flex justify-center items-center"
                      style={{ flex: 2 }}
                    >
                      <i className="fa regular fa-bookmark"></i>
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveBookmark}
                      className="bg-red-500 hover:bg-red-700 duration-150 rounded-md mt-4 ml-2 flex justify-center items-center"
                      style={{ flex: 2 }}
                    >
                      <i className="fa solid fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex myScreenTwo:justify-center myScreenTwo:mt-14 myScreenTwo:ml-10 mb-6 mx-7">
              {trailerUrl ? (
                <iframe
                  src={trailerUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="shadow-myShadow md:h-[350px] md:w-[600px] myScreen:w-[760px] myScreen:h-[400px]"
                ></iframe>
              ) : (
                <p className="shadow-myShadow h-[200px] w-full md:h-[350px] md:w-[600px] myScreen:w-[760px] myScreen:h-[400px] flex justify-center items-center ">
                  No trailer available
                </p>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Conditionally render the LoginModal */}
      {showLoginModal && (
        <LoginModal onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default AboutFilm;
