import { useEffect, useState } from 'react'
import {apiKey} from '../../../api/api'
import Card from '../Components/Card'

const API_URL = `http://www.omdbapi.com/?apikey=${apiKey}`

const Movies = () => {

  const [movies, setMovies] = useState([]); // List of movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchTerm: string) => {
    try {
      setLoading(true);

      // Step 1: Fetch the list of movies with `&s=`
      const response = await fetch(`${API_URL}&s=${searchTerm}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      if (data.Response === "False") throw new Error(data.Error);

      // Step 2: Fetch detailed information for each movie using `&i=`
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const detailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
          const detailsData = await detailsResponse.json();
          return detailsData; // Return detailed movie info
        })
      );

      setMovies(detailedMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("Godzilla");
  }, []);

  return (
    <section id='movies'>
            <div className="flex justify-center pt-12">
        <h1 className="font-bold text-4xl text-emerald-600">Movies</h1>
      </div>
      <div className='w-full h-fit flex flex-wrap justify-center gap-3 px-4 pt-8 pb-8 '>
        {movies.map((movie) => 
        <Card movie={movie} key={movie.imdbID}/>
        )}
        
      </div>
    </section>
  )
}

export default Movies
