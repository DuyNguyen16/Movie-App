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
            className="backdrop fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 px-10"
            onClick={handleBackdropClick}  >
            <div className="bg-myDark p-6 rounded-md relative">
                {/* Close button */}
                <button onClick={closeModal} className="lg:absolute top-2 right-3 text-white font-bold text-xl">X</button>

                <div className='lg:flex flex-row lg:gap-8'>
                    {/* Poster */}
                    <img
                        src={object.Poster === "N/A" ? noPosterImage : object.Poster}
                        alt={object.Title}
                        className=" lg:h-76 object-cover rounded lg:w-72"
                    />
                    <div className='flex flex-col gap-2 lg:w-80'>
                        {/* Details */}
                        <h2 className="lg:text-2xl font-bold mt-2 text-xl">{object.Title}</h2>
                        <hr></hr>
                        <p className="text-xl">{object.Year.slice(0, 4)}</p>
                        <p className="text-lg">{object.Genre}</p>
                        <p className="text-md">{object.Plot}</p>
                        <button className='bg-orange-400 rounded-sm py-1 hover:bg-orange-500 duration-150'><i className="fa fa-bookmark mr-2"></i>Add to Watchlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
