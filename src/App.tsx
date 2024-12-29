import Home from './home/Home'
import Movies from './movies/Movies'

import TVShows from './tv-show/TVShows'

const App = () => {
  return (
    <>
      <main>
        <Home />
        <Movies />
        <TVShows/>
        <a href='#header'><div className='bg-emerald-600 px-3 py-1 fixed right-5 bottom-5 lg:right-10 lg:bottom-10 rounded-2xl hover:bg-emerald-800 duration-150 font-bold'>^</div></a>
      </main>
    </>
  )
}

export default App
