/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../constant/Constant";
import Card from "../../Components/Card";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const context = useContext(mainContext);
  const [userBookmarks, setUserBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserBookmarks = async (userEmail: string) => {
    try {
      setLoading(true);
      // Reference to the "bookmarks" collection
      const bookmarksRef = collection(db, "bookmarks");

      const q = query(bookmarksRef, where("user", "==", userEmail));

      // Fetch the documents that match the query
      const querySnapshot = await getDocs(q);

      // Create a new array of bookmarks
      const fetchedBookmarks: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedBookmarks.push({ id: doc.id, ...doc.data() });
      });

      // Update state with the fetched bookmarks
      setUserBookmarks(fetchedBookmarks);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching user bookmarks:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run if there's a valid user email
    if (context.user?.email) {
      getUserBookmarks(context.user.email);
    } else {
      setLoading(false)
    }
  }, [context.user?.email]);

  return (
    <section id="movies" className="lg:px-1 h-screen">
      <div className="flex justify-center pt-8">
        <h1 className="font-bold text-4xl text-emerald-600"> My Bookmarks</h1>
      </div>
      {context.user?.email == null ? <div className="flex justify-center h-screen pt-32 text-xl"><div className="flex flex-col gap-3">Please login to view your bookmarks<Link className=" text-md text-gray-400 flex justify-center items-center gap-2 hover:text-gray-600" to={"/user/login"}>Go to login <i className="fa solid fa-arrow-right"></i></Link></div></div> : loading ? (
        <div className="flex justify-center h-screen">Loading...</div>
      ) : error ? (
        <div className="flex justify-center text-red-500">{error}</div>
      ) : (
        <div className="w-full h-fit flex flex-row flex-wrap justify-center gap-3 px-4 pt-8 pb-8">
          {userBookmarks.length === 0 ? (
            <p>No bookmarks found.</p>
          ) : (
            userBookmarks.map((film) => (
              <Card film={film} key={film.id} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default Bookmark;
