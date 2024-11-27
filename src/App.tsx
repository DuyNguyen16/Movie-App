import { useEffect, useState } from 'react'
import {apiKey} from '../../api/api'
import Home from './pages/Home'
import Movies from './movies/Movies'
import Header from './header/Header'

const API_URL = `http://www.omdbapi.com/?apikey=${apiKey}`

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Movies />
        <div className='bg-emerald-600 px-3 py-1 fixed right-10 bottom-10 rounded-2xl'><a href='#header'>^</a></div>
      </main>
    </>
  )
}

export default App
