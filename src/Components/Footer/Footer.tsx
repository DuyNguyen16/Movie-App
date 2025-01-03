
const Footer = () => {
    return (
        <footer className="bg-[#2c2c2e] text-white py-12 mt-64 md:mt-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
                <div>
                    <h4 className="text-lg font-semibold">About</h4>
                    <p className="mt-2 text-gray-400">
                        MyMovies helps you explore and discover movies with ease.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Contact</h4>
                    <p className="mt-2 text-gray-400">Email: khanhduyn161@gmail.com</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Links</h4>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/in/khanh-duy-nguyen/"
                                className="text-blue-400 hover:underline"
                                aria-label="LinkedIn Profile"
                            >
                                <i className="fab fa-linkedin"></i> LinkedIn
                            </a>
                        </li>

                        <li>
                            <a
                                target="_blank"
                                href="https://github.com/DuyNguyen16"
                                className="text-blue-400 hover:underline"
                                aria-label="LinkedIn Profile"
                            >
                                <i className="fa brands fa-square-github"></i>
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-6 text-gray-400">
                <p>&copy; 2025 MyMovies. All rights reserved.</p>
                <p>
                    Powered by{" "}
                    <a
                        href="https://www.omdbapi.com/"
                        className="text-blue-400 hover:underline"
                    >
                        OMDb API, Youtube Data API V3
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
