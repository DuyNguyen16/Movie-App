export interface Movie {
        Ratings: string;
        Runtime: string;
        imdbID: string;
        Title: string;
        Year: string;
        Poster: string;
        Plot?: string;
        Genre?: string;
    };


export interface Rating {
        Source: string;
        Value: string;
    }