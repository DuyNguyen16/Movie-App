import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { mainContext } from "../../constant/Constant";
import UserProfile from "../../userPage/UserProfile";

const Header = () => {
    const context = useContext(mainContext);
    const [input, setInput] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/search/${input}`);
            setInput("");
        }
    };

    const handleSearchClick = () => {
        if (input.trim()) {
            navigate(`/search/${input}`);
            setInput(""); 
        }
    };

    return (
        <header className="text-white" id="header">
            <div className="flex bg-myDark shadow-myShadow h-16 items-center px-6 justify-between">
                <div>
                    <Link to={"/"}
                        className="text-2xl font-bold cursor-pointer text-emerald-500"
                    >
                        MyMovies
                    </Link>
                </div>

                <nav className="hidden lg:flex">
                    <ul className="flex flex-row gap-8">
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">
                            <HashLink to="/#movies" smooth>
                                Movies
                            </HashLink>
                        </li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">
                            <HashLink to="/#tv-shows" smooth>
                                TV Series
                            </HashLink>
                        </li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">
                            <HashLink to={`/bookmark/${context.user?.uid}`} smooth>
                                Bookmarks
                            </HashLink>
                        </li>
                    </ul>
                </nav>

                <div className="lg:hidden flex items-center gap-5">
                {context.user?.email == null ? <></> :<UserProfile />}
                    <button
                        className="text-white text-xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div className="relative">
                        <form onSubmit={handleOnSubmit}>
                            <input
                                className="text-black rounded-lg border-0 px-2 h-8 w-64 outline-none"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                aria-label="Search"
                            />
                            <button
                                onClick={handleSearchClick}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-500"
                                aria-label="Search"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                    {context.user?.email == null ? (
                        <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-white font-semibold hover:bg-emerald-700 duration-150">
                            <Link to="/user/Login">
                                <span className="cursor-pointer">Login/Signup</span>
                            </Link>
                        </div>
                    ) : (
                        <UserProfile />
                    )}

                </div>
            </div>

            {menuOpen && (
                <div className="lg:hidden bg-myDark p-4 absolute top-16 left-0 w-full z-20">
                    <ul>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2">
                            <HashLink to="/#movies" smooth>
                                Movies
                            </HashLink>
                        </li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2">
                            <HashLink to="/#tv-shows" smooth>
                                TV Series
                            </HashLink>
                        </li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">
                            <HashLink to={`/bookmark/${context.user?.uid}`} smooth>
                                Bookmarks
                            </HashLink>
                        </li>
                        <li className="py-2">
                            <div className="relative">
                                <form onSubmit={handleOnSubmit}>
                                    <input
                                        className="text-black rounded-lg border-0 px-2 h-8 w-full outline-none"
                                        placeholder="Search"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        aria-label="Search"
                                    />
                                    <button
                                        onClick={handleSearchClick}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-500"
                                        aria-label="Search"
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>
                                </form>
                            </div>
                        </li>
                        <li className="py-2">
                        {context.user?.email == null ? (
                        <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-white font-semibold hover:bg-emerald-700 duration-150">
                            <Link to="/user/Login">
                                <span className="cursor-pointer">Login/Signup</span>
                            </Link>
                        </div>
                    ) : (
                        <></>
                    )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
