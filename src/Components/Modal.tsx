import React from 'react';
import noPosterImage from "../assets/no-poster.jpg";
import { Film } from '../types/Types';

// Modal component
const Modal = ({ object, closeModal } : {object : Film; closeModal: () => void}) => {
  // Function to handle click outside the modal to close it
    const handleBackdropClick = (err : React.MouseEvent<HTMLElement>) => {
        // Close modal if the click happens outside of the modal content
        const target = err.target as HTMLElement
        if (target.classList.contains('backdrop')) {
            closeModal();
        }
    };

    return (
        <div 
            className="backdrop fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 px-10"
            onClick={handleBackdropClick}>
            <div className="bg-myDark p-6 rounded-md relative">
                {/* Close button */}
                <button onClick={closeModal} className="lg:absolute top-2 right-3 text-white font-bold text-xl">X</button>

                <div className='md:flex flex-row md:gap-8'>
                    {/* Poster */}
                    <img
                        src={object.Poster === "N/A" ? noPosterImage : object.Poster}
                        alt={object.Title}
                        className="object-cover rounded h-40 md:h-4/6"
                    />
                    <div className='flex flex-col md:gap-2 md:w-80'>
                        {/* Details */}
                        <h2 className="lg:text-2xl font-bold mt-2 text-lg md:text-xl">{object.Title}</h2>
                        <hr></hr>
                        <p className="text-xl font-semibold">{object.Year.slice(0, 4)}</p>
                        <p className="font-bold text-orange-400">
                        <i className="fa solid fa-star mr-1"></i>
                        {object.Ratings.length == 0 ? "N/A": object.Ratings[0].Value}
                        </p>
                        <p className="text-lg font-semibold">{object.Genre}</p>
                        <p className="text-md">{object.Plot}</p>
                        <button className='bg-orange-400 rounded-sm py-1 hover:bg-orange-500 duration-150'><i className="fa fa-bookmark mr-2"></i>Add to Watchlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
