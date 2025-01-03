import { useEffect, useState } from 'react';
import Card from '../../Components/Card';
import { Film } from '../../types/Types';
import { API_URL } from '../../constant/Constant';


const Movies = () => {
  const [movies, setMovies] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies function
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchTerm = "new";
      const year = 2024;
      const maxPages = 2;
      let allMovies: Film[] = [];
      
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
      
      setMovies(allMovies);
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
        <div className="w-full h-fit flex md:flex-row flex-wrap justify-center gap-3 pt-8 pb-8">
          {movies.map((movie) => (
            <Card film={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Movies;
