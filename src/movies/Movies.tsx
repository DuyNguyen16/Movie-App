import { useEffect, useState } from 'react';
import { apiKey } from '../../../api/api';
import Card from '../Components/Card';

const API_URL = `http://www.omdbapi.com/?apikey=${apiKey}`;

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot?: string;
  Genre?: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // List of movies
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies function
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchTerm = "new";
      const year = 2024;
      const maxPages = 3;
      let allMovies: Movie[] = [];
      
      // loop through each page of the response
      for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(`${API_URL}&s=${searchTerm}&y=${year}&page=${page}&type=movie`);

        // check if data were able to be fetched
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // No more results to fetch
        if (data.Response === 'False') {
          break
        };

        // Filter movies for uniqueness
        allMovies = [...allMovies, ...data.Search];
      }

      // Fetch detailed data for the first 20 movies only
      const detailedMovies = await Promise.all(
        allMovies.slice(0, 18).map(async (movie: { imdbID: string }) => {
          const detailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
          if (!detailsResponse.ok) throw new Error('Failed to fetch movie details');

          const detailsData = await detailsResponse.json();
          return detailsData as Movie;
        })
      );
      
      setMovies(detailedMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section id="movies" className='lg:px-1'>
      <div className="flex justify-center pt-8">
        <h1 className="font-bold text-4xl text-emerald-600">New Movies</h1>
      </div>
      {loading ? (
        <div className="flex justify-center h-screen">Loading...</div>
      ) : error ? (
        <div className="flex justify-center text-red-500">{error}</div>
      ) : (
        <div className="w-full h-fit flex flex-wrap justify-center gap-3 px-4 pt-8 pb-8">
          {movies.map((movie) => (
            <Card object={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Movies;
