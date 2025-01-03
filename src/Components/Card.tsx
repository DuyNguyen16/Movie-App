import noPosterImage from "../assets/no-poster.jpg";
import { Film } from '../types/Types';
import { Link } from 'react-router-dom';

const Card = ({ film }: { film: Film }) => {
  const year = film.Year ? film.Year.slice(0, 4) : "N/A";
  return (
    <div
      key={film.imdbID}
      className="shadow-myShadow p-4 rounded flex flex-col w-44 lg:w-56 gap-4 md:gap-0"
    >
      {/* Poster */}
      <img
        src={film.Poster === "N/A" ? noPosterImage : film.Poster}
        alt={film.Title}
        className="w-full h-56 lg:h-64 film-cover rounded"
      />
      {/* Overlay with Title and Year */}
      <div className="mt-2 text-white flex flex-col flex-grow">
        <h2 className="text-md lg:text-sm font-bold pb-1">{film.Title}</h2>
        <div className="flex-grow"></div> {/* Spacer pushes content below */}
        <div className="flex justify-between pb-1">
          <p className="text-md">{year}</p>
          <p className="border rounded-md px-1">{film.Type}</p>
        </div>
        {/* Button */}
        <Link
          to={`/about/${film.Title}`}
          key={film.imdbID}
          className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-2 py-1"
        >
          <button className="w-full">More</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
