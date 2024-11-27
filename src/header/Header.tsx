import { useState } from "react";

const Header = () => {
    const [input, setInput] = useState("");
    
    return (
        <header className="text-white" id="header">
            <div className="flex bg-myDark shadow-myShadow h-16 items-center px-6 justify-between">
                <div>
                    <a className="text-2xl font-bold cursor-pointer text-emerald-500" href="/">MyMovies</a>
                </div>
                <nav>
                    <ul className="flex flex-row gap-10">
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold"><a href="#movies">Movies</a></li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">Genre</li>
                        <li className="cursor-pointer hover:text-emerald-500 duration-150 font-semibold">TV Series</li>
                    </ul>
                </nav>

                <div>
                    <input className="text-black rounded-lg border-0 px-2 h-8 w-64 outline-none" placeholder="Search" value={input} onChange={(e) => {
                        setInput(e.target.value);
                    }}></input>
                </div>

                <div className="bg-emerald-500 px-4 rounded-md h-8 flex items-center text-black font-semibold hover:bg-emerald-700 duration-150">
                    <a className="cursor-pointer">Login/Signup</a>
                </div>
            </div>
        </header>
    )
}

export default Header;
