import { useContext, useState } from 'react';
import { auth } from '../../firebase'; // Import Firebase auth instance
import { signOut } from 'firebase/auth'; // Import signOut method
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../constant/Constant';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigatte = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const context = useContext(mainContext);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      toast.success(`User Logged out`);
      setIsDropdownOpen(false); // Close the dropdown after logout
      // Optionally, redirect to another page after logout
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error logging out: ${error.message}`);
      } else {
        toast.error('Unknown error occurred during logout.');
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button
        onClick={toggleDropdown}
        className="bg-emerald-500 hover:bg-emerald-700 p-1.5 px-3 rounded-full duration-150">
        <i className="fa regular fa-user text-white"></i> {/* Profile icon */}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
          {/* Triangle Point */}

          <ul className="py-2 text-black">
            <li>
              <button
                onClick={() => navigatte(`/bookmark/${context.user?.uid}`)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-300">
                Bookmark
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-300 text-red-500 font-bold">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
