import noPosterImage from "../assets/no-poster.jpg";
import { Movie } from '../types/Types';
import { Link } from 'react-router-dom';

const Card = ({ object } : {object : Movie}) => {
  return (
    <div key={object.imdbID} className="shadow-myShadow p-4 rounded flex flex-row md:flex-col md:w-52 lg:w-64 gap-4 md:gap-0">
      {/* Poster */}
      <img
        src={object.Poster === "N/A" ? noPosterImage : object.Poster}
        alt={object.Title}
        className="w-32 md:w-full md:h-56 lg:h-64 object-cover rounded"
      />
      {/* Overlay with Title and Year */}
      <div className="mt-2 text-white flex flex-col flex-grow">
        <h2 className="text-lg lg:text-xl font-bold">{object.Title}</h2>
        <p className="text-md">{object.Year.slice(0, 4)}</p>
        <p className="text-md pb-2">{object.Genre}</p>
        {/* Button */}
        <Link to={`/${object.Title}`} key={object.imdbID} className="bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-white font-bold mt-auto py-1">
          <button className='w-full'>
            More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
