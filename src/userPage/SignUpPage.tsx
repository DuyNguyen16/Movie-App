import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCre = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCre.user;
            console.log('Sign Up successfull: ', user);
            navigate('/')
        } catch (error) {
            // Check to see if the error is from firebase
            if (error instanceof FirebaseError) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }
    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='p-6 shadow-myShadow'>
                <h1 className='font-bold text-center pb-5 text-2xl'>Sign Up</h1>
                <div className=''>
                    <form className='flex flex-col gap-2' onSubmit={handleOnSubmit}>
                        <input className='p-1 rounded-sm px-6'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input className='p-1 rounded-sm px-6'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <a href='' className='flex justify-end text-gray-500'>Forgot password?</a>
                        <button className='bg-emerald-500 px-4 rounded-sm h-8 flex justify-center items-center text-white font-semibold hover:bg-emerald-700 duration-150'
                            type="submit">Login</button>
                    </form>
                    {error && <p className='text-red-500'>{error}</p>}
                    <p className='text-gray-500 pt-6'>Don't have an account yet? <span className='text-white font-bold'><Link to={'/user/SignUp'}>Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage