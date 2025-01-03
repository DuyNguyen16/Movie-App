import { VITE_OMDB_API_KEY } from '../../api/api';
import { User } from 'firebase/auth';
import React from 'react';

export const API_URL = `https://www.omdbapi.com/?apikey=${VITE_OMDB_API_KEY}`;

export interface UserContext {
    user: User | null; // user can be a User object or null
}

export const mainContext = React.createContext<UserContext>({
    user: null, // Default value
})
