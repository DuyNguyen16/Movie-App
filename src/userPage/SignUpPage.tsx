import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../Components/GoogleSignIn";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        // Basic password validation (e.g., min length 6)
        if (password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        setError(""); // Reset error message before making the request
        setIsLoading(true); // Set loading to true

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCred.user;
            console.log("Sign Up successful: ", user);
            navigate("/"); // Redirect to home page on successful sign-up
        } catch (error) {
            // Check Firebase-specific errors
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    setError("This email is already registered. Please use a different email.");
                } else {
                    setError(error.message); // Display Firebase error message
                }
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false); // Reset loading state after request is complete
        }
    };

    return (
        <section className="pt-32 h-screen">
            <div className='w-full flex justify-center'>
                <div className="p-6 shadow-myShadow w-full mx-6 md:w-[32rem] h-[30rem] bg-[#222222">
                    <h1 className="font-bold text-center pb-5 text-3xl">Sign Up</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
                        <div className='relative text-white'>
                            <input
                                className="p-1 rounded-sm w-full pl-8 bg-[#222222] py-2"
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <i className="fa solid fa-envelope absolute left-2 top-1/2 -translate-y-1/2"></i>
                        </div>
                        <div className="relative text-white">
                            <input
                                className="p-1 rounded-sm w-full pl-8 bg-[#222222] py-2"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i className="fa solid fa-lock absolute left-2 top-1/2 -translate-y-1/2"></i>
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${showPassword ? 'text-emerald-500' : 'text-white'}`}
                                aria-label="Toggle password visibility"
                                type="button"
                            >
                                <i className="fa solid fa-eye"></i>
                            </button>
                        </div>
                        <Link to={"/user/resetPassword"} className="flex justify-end hover:text-gray-500 duration-150">
                            Forgot password?
                        </Link>
                        <button
                            className="bg-emerald-500 rounded-sm h-10 flex justify-center items-center text-white font-semibold hover:bg-emerald-700 duration-150"
                            type="submit"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? "Signing Un..." : "Sign Up"}
                        </button>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                    <p className="text-gray-500 pt-6 pb-8">
                        Already have an account?
                        <span className="text-white font-bold pl-2">
                            <Link to={"/user/login"}>Sign In</Link>
                        </span>
                    </p>
                    <div className='relative'>
                        <div className="flex flex-col items-center w-full">
                        <hr className="border-t-2 border-white w-full mb-4" /><p className='absolute -top-2.5 z-10'>Or</p>
                        <div className='absolute w-14 h-2 bg-myDark -top-1'></div>
                        </div>
                    </div>
                    <GoogleSignIn />
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;
