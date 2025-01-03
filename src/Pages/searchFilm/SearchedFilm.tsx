import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film } from "../../types/Types";
import { API_URL } from "../../constant/Constant";
import Card from "../../Components/Card";

const SearchedFilm = () => {
  const { filmName } = useParams();

  const [film, setFilm] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = async () => {
    try {
      setLoading(true);
      setError(null);

      let searchFilms: Film[] = [];

      for (let page = 1; page <= 2; page++) {
        const response = await fetch(`${API_URL}&s=${filmName}&page=${page}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.Response === "False") {
          break;
        }

        // Filter out duplicates based on imdbID
        const uniqueFilms = data.Search.filter(
          (film: Film) =>
            !searchFilms.some((existing) => existing.imdbID === film.imdbID)
        );

        searchFilms = [...searchFilms, ...uniqueFilms];
      }

      setFilm(searchFilms);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filmName) {
      fetchFilms();
    }
  }, [filmName]);

  return (
    <section>
      <div>
        <div className="flex justify-center pt-8">
          <h1 className="font-bold text-4xl text-emerald-600">Searched films</h1>
        </div>
        {loading ? (
          <div className="flex justify-center h-screen">Loading...</div>
        ) : error ? (
          <div className="flex justify-center text-red-500">{error}</div>
        ) : film.length === 0 ? (
          <div className="flex justify-center text-red-500">Could not find any film called '{filmName}'!</div>
        ) : (
          <div className="w-full h-fit flex flex-row flex-wrap justify-center gap-3 px-4 pt-8 pb-8">
            {film.map((film) => (
              <Card film={film} key={film.imdbID} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchedFilm;
