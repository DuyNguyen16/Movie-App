import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Film } from "../types/Types";
import { API_URL } from "../constant/Constant";

const TVShows = () => {
  const [tvShows, setTVShows] = useState<Film[]>([]); // List of TV shows
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  // Fetch TV shows function
    const fetchTVShows = async () => {
    try {
        setLoading(true);
        setError(null);

      const searchTerm = "new"; // Search for new TV shows
        const year = 2024;
        const maxPages = 3;
        let allTVShows: Film[] = [];

      // Loop through each page of the response
        for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(
            `${API_URL}&s=${searchTerm}&y=${year}&page=${page}&type=series`
        );

        // Handle errors in fetching data
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Break if no more results are found
        if (data.Response === "False") {
            break;
        }

        // Collect all TV shows
        allTVShows = [...allTVShows, ...data.Search];
        }

      // Fetch detailed data for the first 18 TV shows only
        const detailedTVShows = await Promise.all(
        allTVShows.slice(0, 18).map(async (tvShow: { imdbID: string }) => {
            const detailsResponse = await fetch(`${API_URL}&i=${tvShow.imdbID}`);

          // Handle errors in fetching detailed TV show data
            if (!detailsResponse.ok) {
                throw new Error("Failed to fetch TV show details");
            }

            const detailsData = await detailsResponse.json();
            return detailsData as Film;
        })
        );
        
        // Update the state
        setTVShows(detailedTVShows);
    } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    fetchTVShows();
    }, []);

    return (
    <section id="tv-shows" className="px-1">
        <div className="flex justify-center pt-8">
        <h1 className="font-bold text-4xl text-emerald-600">New TV Shows</h1>
        </div>
        {loading ? (
        <div className="flex justify-center">
          {/* Loading spinner */}
            <div className="spinner"></div>
        </div>
        ) : error ? (
        <div className="flex justify-center text-red-500">{error}</div>
        ) : (
        <div className="w-full h-fit flex flex-col md:flex-row md:flex-wrap justify-center gap-3 px-4 pt-8 pb-8">
            {tvShows.map((tvShow) => (
            <Card film={tvShow} key={tvShow.imdbID} />
            ))}
        </div>
        )}
    </section>
    );
};

export default TVShows;
