import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import AboutFilm from './about/AboutFilm'
import Header from './header/Header'



const Routing = () => {
  return (
    <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path="/:name" element={<AboutFilm />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing