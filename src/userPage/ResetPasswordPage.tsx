import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            // Send password reset email
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Please check your inbox.");
            setTimeout(() => {
                navigate("/login"); // Redirect to login page after success
            }, 3000);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to send reset email."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center pt-32 h-screen">
            <div className="p-6 shadow-myShadow w-full mx-6 md:w-[32rem] h-[20rem] flex flex-col gap-4">
                <h1 className="font-bold text-center pb-5 text-2xl">Reset Password</h1>
                <form className="flex flex-col gap-3" onSubmit={handleOnSubmit}>
                    <div className="relative text-white">
                        <input
                            className="p-1 rounded-sm w-full bg-[#222222] pl-8 py-2"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className="fa solid fa-envelope absolute left-2 top-1/2 -translate-y-1/2"></i>
                    </div>
                    <button
                        type="submit"
                        className="bg-emerald-500 px-4 rounded-sm h-10 flex justify-center items-center text-white font-semibold hover:bg-emerald-700 duration-150"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
                <Link to={"/user/login"} className="hover:text-gray-400 duration-150">
                    <i className="fa solid fa-arrow-left"></i> Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
