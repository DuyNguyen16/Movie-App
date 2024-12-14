import { useState } from "react";

const Header = () => {
    const [input, setInput] = useState("");
    // Toggle state for mobile menu
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="text-white" id="header">
            <div className="flex bg-myDark shadow-myShadow h-16 items-center px-6 justify-between">
                <div>
                    <a className="text-2xl font-bold cursor-pointer text-emerald-500" href="/">MyMovies</a>
                </div>
                
                {/* Navigation */}
                <nav className="hidden lg:flex">
                    <ul className="flex flex-row gap-10">
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold"><a href="#movies">Movies</a></li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold"><a href="#genre">Genre</a></li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold"><a href="#tv-shows">TV Series</a></li>
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <button 
                        className="text-white text-xl"
                        onClick={() => setMenuOpen(!menuOpen)} // Toggle mobile menu
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                {/* Input & Login Section */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Input field */}
                    <div className="hidden lg:block">
                        <input
                            className="text-black rounded-lg border-0 px-2 h-8 w-64 outline-none"
                            placeholder="Search"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    {/* Login button */}
                    <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-[#333333] font-semibold hover:bg-emerald-700 duration-150">
                        <a className="cursor-pointer">Login/Signup</a>
                    </div>
                </div>
            </div>
            
            {/* ------------------------------------------------------------------------------------------------------- */}
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-myDark p-4 absolute top-16 left-0 w-full z-10">
                    <ul>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2"><a href="#movies">Movies</a></li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2">Genre</li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold py-2"><a href="#tv-shows">TV Series</a></li>
                        {/* Search Input in mobile view */}
                        <li className="py-2">
                            <input
                                className="text-black rounded-lg border-0 px-2 h-8 w-full outline-none"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </li>
                        <li className="py-2">
                            <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-black font-semibold hover:bg-emerald-700 duration-150">
                                <a className="cursor-pointer">Login/Signup</a>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;
