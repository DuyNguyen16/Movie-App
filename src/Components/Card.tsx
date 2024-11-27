import React from 'react'

const Card = ({movie}) => {
  return (
    <div key={movie.imdbID} className="shadow-myShadow p-4 rounded flex flex-col w-64">
    {/* Poster */}
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-auto object-contain rounded"
    />
    {/* Overlay with Title and Year */}
    <div className="mt-2 text-white">
      <h2 className="text-xl font-bold">{movie.Title}</h2>
      <p className="text-sm">{movie.Year}</p>
      <p className="text-sm">{movie.Genre}</p>
    </div>
  </div>
  )
}

export default Card