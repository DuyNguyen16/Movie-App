import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Film } from '../types/Types';

const SearchedFilm = () => {
  const { name } = useParams();

    const [film, setFFilm] = useState<Film[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  return (
    <div>{name}</div>
  )
}

export default SearchedFilm