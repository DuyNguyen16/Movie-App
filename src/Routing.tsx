import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import SearchedMovie from './Components/SearchedMovie'



const Routing = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path="/:name" element={<SearchedMovie />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing