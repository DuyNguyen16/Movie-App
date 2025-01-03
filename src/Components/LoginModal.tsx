import React from "react";
import { Link } from "react-router-dom";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#252525] p-12 rounded shadow-lg w-full mx-4 md:w-[38rem]">
        <h3 className="text-xl font-semibold mb-4 text-center">Login Required</h3>
        <p className="mb-4">You need to log in to bookmark this movie. Would you like to log in?</p>
        <div className="flex justify-around">
          <Link
            to={"/user/login"}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-700 duration-150"
          >
            Log In
          </Link>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
