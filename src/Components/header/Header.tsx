import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Header = () => {
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

    return (
        <header className="text-white" id="header">
            <div className="flex bg-myDark shadow-myShadow h-16 items-center px-6 justify-between">
                <div>
                    <a
                        className="text-2xl font-bold cursor-pointer text-emerald-500"
                        href="/"
                    >
                        MyMovies
                    </a>
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
                            <HashLink to="/#genre" smooth>
                                Genre
                            </HashLink>
                        </li>
                    </ul>
                </nav>

                <div className="lg:hidden flex items-center gap-2">
                    <button
                        className="text-white text-xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div>
                        <form onSubmit={handleOnSubmit}>
                            <input
                                className="text-black rounded-lg border-0 px-2 h-8 w-64 outline-none"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                aria-label="Search"
                            />
                        </form>
                    </div>

                    <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-white font-semibold hover:bg-emerald-700 duration-150">
                        <a className="cursor-pointer">Login/Signup</a>
                    </div>
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
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2">
                            <HashLink to="/#genre" smooth>
                                Genre
                            </HashLink>
                        </li>
                        <li className="py-2">
                            <input
                                className="text-black rounded-lg border-0 px-2 h-8 w-full outline-none"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                aria-label="Search"
                            />
                        </li>
                        <li className="py-2">
                            <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-white font-semibold hover:bg-emerald-700 duration-150">
                                <a className="cursor-pointer">Login/Signup</a>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
