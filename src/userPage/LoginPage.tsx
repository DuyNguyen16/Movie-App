import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../Components/GoogleSignIn';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state for submission

    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        setError(""); // Clear previous errors
        setIsLoading(true); // Set loading to true

        try {
            // Firebase Auth sign-in method
            await signInWithEmailAndPassword(auth, email, password);
            
            toast.success('Login successful:');
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            if (error instanceof FirebaseError) {
                // Handle Firebase errors
                switch (error.code) {
                    case 'auth/user-not-found':
                        setError('No user found with this email.');
                        break;
                    case 'auth/wrong-password':
                        setError('Incorrect password. Please try again.');
                        break;
                    case 'auth/invalid-email':
                        setError('Please provide a valid email address.');
                        break;
                    default:
                        setError('An unexpected error occurred. Please try again.');
                        break;
                }
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // Reset loading state after submission
        }
    };

    return (
        <section className="flex justify-center pt-32 h-screen">
            <div>
                <div className="p-6 shadow-myShadow md:w-[32rem] h-[30rem] bg-[#222222">
                    <h1 className="font-bold text-center pb-5 text-3xl">Login</h1>
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
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                    <p className="text-gray-500 pt-6 pb-8">
                        Don't have an account?
                        <span className="text-white font-bold pl-2">
                            <Link to={"/user/signup"}>Sign Up</Link>
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

export default LoginPage;
