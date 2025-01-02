import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import Firebase auth
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google-logo.png'

const GoogleSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        setIsLoading(true);

        try {
            // Sign in with Google using Firebase
            const result = await signInWithPopup(auth, provider);

            // The signed-in user info
            const user = result.user;

            // Set user in your context or store
            console.log('User signed in:', user);

            // Redirect or show user profile info
            navigate('/');

        } catch (error) {
            console.error('Error during Google sign-in:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={handleGoogleSignIn}
                className="bg-[#222222] hover:bg-[#1a1919] text-white p-2 rounded-full flex items-center gap-2 duration-150"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <img src={googleLogo} alt="Google logo" className='w-5'/>
                        Sign In with Google
                    </>
                )}
            </button>
        </div>
    );
};

export default GoogleSignIn;
