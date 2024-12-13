import React from 'react';
import noPosterImage from "../assets/no-poster.jpg";

// Modal component
const Modal = ({ object, closeModal }) => {
  // Function to handle click outside the modal to close it
    const handleBackdropClick = (err) => {
        // Close modal if the click happens outside of the modal content
        if (err.target.classList.contains('backdrop')) {
            closeModal();
        }
    };

    return (
        <div 
            className="backdrop fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}  >
            <div className="bg-myDark p-6 rounded-md relative">
                {/* Close button */}
                <button onClick={closeModal} className="absolute top-2 right-3 text-white font-bold text-xl">X</button>

                <div className='flex flex-row gap-8'>
                    {/* Poster */}
                    <img
                        src={object.Poster === "N/A" ? noPosterImage : object.Poster}
                        alt={object.Title}
                        className="h-76 object-cover rounded"
                    />
                    <div className='flex flex-col gap-2 w-80'>
                        {/* Details */}
                        <h2 className="text-2xl font-bold">{object.Title}</h2>
                        <p className="text-xl">{object.Year}</p>
                        <p className="text-sm">{object.Genre}</p>
                        <p className="">{object.Plot}</p>
                        <button className='bg-orange-400 rounded-sm py-1'>Add to Watchlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
