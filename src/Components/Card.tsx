import { useState } from 'react';
import Modal from './Modal'; // Import the Modal component
import noPosterImage from "../assets/no-poster.jpg";
import { Movie } from '../types/Types';

const Card = ({ object } : {object : Movie}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true); // Set state to show the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Set state to hide the modal
  };

  return (
    <div key={object.imdbID} className="shadow-myShadow p-4 rounded flex flex-col w-40 md:w-52 lg:w-64">
      {/* Poster */}
      <img
        src={object.Poster === "N/A" ? noPosterImage : object.Poster}
        alt={object.Title}
        className="w-full h-40 md:h-56 lg:h-64 object-cover rounded"
      />
      {/* Overlay with Title and Year */}
      <div className="mt-2 text-white flex flex-col flex-grow">
        <h2 className="lg:text-xl font-bold">{object.Title}</h2>
        <p className="text-sm">{object.Year.slice(0, 4)}</p>
        <p className="text-sm pb-2">{object.Genre}</p>
        {/* Button */}
        <button
          onClick={openModal}
          className='bg-emerald-600 rounded-sm hover:bg-emerald-800 duration-150 text-[#333333] font-bold mt-auto py-1'
        >
          More
        </button>
      </div>

      {/* Modal that appears when the button is clicked */}
      {isModalOpen && <Modal object={object} closeModal={closeModal} />}
    </div>
  );
};

export default Card;
