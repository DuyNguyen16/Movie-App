import { apiKey } from '../../../api/api';
import { User } from 'firebase/auth';
import React from 'react';

export const API_URL = `http://www.omdbapi.com/?apikey=${apiKey}`;

export interface UserContext {
    user: User | null; // user can be a User object or null
}

export const mainContext = React.createContext<UserContext>({
    user: null, // Default value
})