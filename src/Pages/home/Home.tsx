import { useEffect, useState } from "react";
import { Film } from "../../types/Types";
import { API_URL } from "../../constant/Constant";

const Home = () => {
    const [movie, setMovie] = useState<Film | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchMovie = async (movieTitle: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}&t=${movieTitle}`);
            if (!response.ok) throw new Error("Failed to fetch data");
    
            const data = await response.json();
    
            if (data.Response === "False") {
                throw new Error(data.Error);
            }
            setMovie(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        searchMovie("Batman Begins");
    }, []);

    return (
        <section className="h-screen" id="home">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && movie && (
            <div className="h-3/4 relative overflow-hidden w-full">
            {/* Background Layer */}
            <div
                className="absolute inset-0"
                style={{
                backgroundImage: movie.Poster ? `url(${movie.Poster})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(5px)",
                zIndex: -1,
                }}
            ></div>
            {/* Content Layer */}
            <div className="relative flex flex-col items-center justify-center h-full text-white">
                <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-contain"
                />
                {/* Text Overlay */}
                <div className="absolute bottom-8 left-6 bg-black bg-opacity-70 px-4 py-2 rounded max-w-lg">
                <h1 className="text-3xl font-bold pb-2">{movie.Title}</h1>
                <div className="flex gap-8 items-center pb-2">
                    <p className="text-lg bg-emerald-600 font-bold px-2 rounded-lg">
                    {movie.Year}
                    </p>
                    <p className="font-bold text-orange-400">
                    <i className="fa solid fa-star mr-1"></i>
                    {movie.Ratings[0].Value}
                    </p>
                    <p>{movie.Runtime}</p>
                    <p>{movie.Genre}</p>
                </div>
                <div>
                    <p>{movie.Plot}</p>
                </div>
                </div>
            </div>
            </div>
        )}
        </section>
    );
};

export default Home;
