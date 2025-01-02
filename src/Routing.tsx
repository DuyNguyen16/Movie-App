import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutFilm from "./Pages/about/AboutFilm";
import Header from "./Components/header/Header";
import SearchedFilm from "./Pages/searchFilm/SearchedFilm";
import Footer from "./Components/Footer/Footer";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:name" element={<AboutFilm />} />
        <Route path="/search/:filmName" element={<SearchedFilm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
