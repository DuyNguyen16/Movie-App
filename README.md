# Movie App - React + TypeScript + Vite

This is a movie application built using **React**, **TypeScript**, and **Vite**. It allows users to **sign up** and **login** to view movie details, and **bookmark** their favorite movies. The app fetches movie data from **OMDb API** and **YouTube Data API v3**, and stores user information and bookmarks in **Firebase Firestore**.

## [Live Demo](https://mymovies123.netlify.app/)

### Test Account

Email: test123@gmail.com
Password: test123

## Features

- User authentication using Firebase (Sign Up / Login)
- Search and view detailed movie information
- Bookmark favorite movies for later access
- Movie data fetched from OMDb API
- YouTube trailers fetched using YouTube Data API v3

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **APIs**:
  - OMDb API (for movie details)
  - YouTube Data API v3 (for movie trailers)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Vite](https://vitejs.dev/) (for development)
- Firebase account for Firestore and Authentication
- OMDb API key (You can get it from [OMDb API](https://www.omdbapi.com/))
- YouTube Data API v3 key (You can get it from [Google Developers Console](https://console.developers.google.com/))

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/DuyNguyen16/Movie-App.git

2. Install dependencies:

   ```bash
   cd movie-app
   npm install

3. Set up your APIKEYS and create a .env file in the root directory with the following variables:

   ```bash
   VITE_OMDB_API_KEY=your_omdb_api_key
   VITE_YOUTUBE_DATA_API=
   VITE_firebaseAPIKey=your_firebase_api_key
   ```

## Contributing

Feel free to fork the repository and submit pull requests. If you find any bugs or have suggestions for improvement, please open an issue.