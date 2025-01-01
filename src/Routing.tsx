import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutFilm from "./about/AboutFilm";
import Header from "./header/Header";
import SearchedMovie from "./searchFilm/SearchedFilm";

const Routing = () => {
  return (
    <BrowserRouter>
      {/* Header must be inside BrowserRouter */}
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:name" element={<AboutFilm />} />
        <Route path="/search/:filmName" element={<SearchedMovie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
