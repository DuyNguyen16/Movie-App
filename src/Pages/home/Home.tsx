import { useEffect, useState } from "react";
import { Film } from "../../types/Types";
import { API_URL } from "../../constant/Constant";
import { Link } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

// Fetch list of Batman-related movies
const searchMovies = async (movieTitle: string) => {
    try {
        // Set loading state to true while fetching data
        setLoading(true);

        // Make API call to search for movies with the provided title
        const response = await fetch(`${API_URL}&s=${movieTitle}&type=movie`);
        if (!response.ok) {throw new Error("Failed to fetch movie list")};

        // Parse the response as JSON
        const data = await response.json();

        // If the API returns a "False" Response (no results found), throw an error with the message from the API
        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        // Fetch detailed information for each movie using imdbID, and wait for all promises to resolve
        const movieDetails = await Promise.all(
            // Map over the Search array from the API response and fetch additional details for each movie
            data.Search.map((movie: Film) => fetchMovieDetails(movie.imdbID))
        );

        // Set the detailed movie data in the state
        setMovies(movieDetails);
    } catch (err) {
        // If an error occurs, check if it's an instance of Error and set the error message
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred");
        }
    } finally {
        // Once the fetching is done (success or error), set loading state to false
        setLoading(false);
    }
};


    // Fetch detailed information for a single movie
    const fetchMovieDetails = async (imdbID: string) => {
        try {
            const response = await fetch(`${API_URL}&i=${imdbID}`);
            if (!response.ok) {
                throw new Error("Failed to fetch movie details");
            };

            const data = await response.json();
            if (data.Response === "False") {
                throw new Error(data.Error);
            }
            return data; // Return the detailed movie data
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            return {} as Film; // Return an empty object if error
        }
    };

    useEffect(() => {
        searchMovies("Batman");
    }, []);

    useEffect(() => {
        // Auto slide every 7 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [movies.length]);

    const handleOnClickRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }

    const handleOnClickLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    }

    return (
        <section className="h-screen relative z-0" id="home">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && movies.length > 0 && (
                <div className="h-3/4 relative overflow-hidden w-full">
                    {/* Clickable Left Navigation */}
                    <div
                        className="absolute top-0 left-0 w-20 md:w-36 h-full z-20 flex items-center justify-center cursor-pointer hover:bg-white hover:opacity-10 duration-200 group"
                        onClick={handleOnClickLeft}
                        aria-label="Previous Slide"
                    >
                        <i className="fas fa-chevron-left text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                    </div>

                    {/* Clickable Right Navigation */}
                    <div
                        className="absolute top-0 right-0 w-20 md:w-36 h-full z-20 flex items-center justify-center cursor-pointer hover:bg-white hover:opacity-10 duration-200 group"
                        onClick={handleOnClickRight}
                        aria-label="Next Slide"
                    >
                        <i className="fas fa-chevron-right text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                    </div>

                    {/* Background Layer */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: movies[currentIndex].Poster
                                ? `url(${movies[currentIndex].Poster})`
                                : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(5px)",
                        }}
                    ></div>

                    {/* Content Layer */}
                    <div className="relative flex flex-col items-center justify-center h-full text-white">
                        <img
                            src={movies[currentIndex].Poster}
                            alt={movies[currentIndex].Title}
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-8 md:left-6 bg-black bg-opacity-70 px-4 mx-4 md:mx-0 py-4 rounded max-w-lg z-50">
                            {/* Movie Details */}
                            <h1 className="text-3xl font-bold pb-2">
                                {movies[currentIndex].Title}
                            </h1>
                            <div className="flex gap-4 md:gap-8 items-center pb-2">
                                <p className="text-lg bg-emerald-600 font-bold px-2 rounded-lg">
                                    {movies[currentIndex].Year}
                                </p>
                                <p className="font-bold text-orange-400">
                                    <i className="fa solid fa-star mr-1"></i>
                                    {movies[currentIndex].imdbRating || "N/A"}
                                </p>
                                <p>{movies[currentIndex].Runtime}</p>
                                <p>{movies[currentIndex].Genre}</p>
                            </div>
                            <p>{movies[currentIndex].Plot}</p>
                            <p className="font-semibold pt-2">
                                Cast: {movies[currentIndex].Actors}
                            </p>
                            <p className="font-semibold pb-2">
                                Director: {movies[currentIndex].Director}
                            </p>
                            <div className="flex">
                                <Link
                                    to={`/about/${movies[currentIndex].Title}`}
                                    className="px-10 py-2 bg-emerald-500 hover:bg-emerald-700 duration-150 rounded-sm font-semibold"
                                >
                                    More
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {movies.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full ${
                                    index === currentIndex
                                        ? "bg-white"
                                        : "bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Home;
