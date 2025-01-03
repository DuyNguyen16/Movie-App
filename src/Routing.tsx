import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutFilm from "./Pages/about/AboutFilm";
import Header from "./Components/header/Header";
import SearchedFilm from "./Pages/searchFilm/SearchedFilm";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./userPage/LoginPage";
import SignUpPage from "./userPage/SignUpPage";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { mainContext } from "./constant/Constant";
import { User, onAuthStateChanged } from "firebase/auth"; 
import Bookmark from "./Pages/bookmark/Bookmark";
import ResetPasswordPage from "./userPage/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing the CSS

const Routing = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up the Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
        console.log('User logged in:', currentUser.email);
      } else {
        setUser(null); // No user is logged in
        console.log('User logged out'); 
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const context = {
    user,
  };

  return (
    <mainContext.Provider value={context}>
      <BrowserRouter>
        <ToastContainer className="pt-2 md:pt-14" position="top-right" autoClose={5000} />
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="user/signup" element={<SignUpPage />} />
          <Route path="/about/:name" element={<AboutFilm />} />
          <Route path="/search/:filmName" element={<SearchedFilm />} />
          <Route path="/bookmark/:uid" element={<Bookmark />}></Route>
          <Route path="/user/resetPassword" element={<ResetPasswordPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </mainContext.Provider>
  );
};

export default Routing;
