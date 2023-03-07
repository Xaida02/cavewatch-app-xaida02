import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const { user, logOut } = useGlobalContext();

  const navigate = useNavigate();
  console.log(user);

  const moviesReference = doc(db, "users", `${user?.email}`);

  console.log(getDoc(moviesReference));

  useEffect(() => {
    onSnapshot(moviesReference, (doc) => {
      console.log(doc.data());
      setUserName(doc.data()?.userName);
    });
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 z-[100] absolute w-full">
      <Link
        to="/"
        className="text-hboPurple4 text-4xl font-bold cursor-pointer select-none"
      >
        CAVEWATCH
      </Link>
      {/* Sign buttons  */}
      {user?.email ? (
        <div className="flex flex-row w-full justify-between mt-2 sm:m-0 md:w-auto">
          <Link
            to="/account"
            className="px-6 py-2 flex justify-center items-center fade-in-load"
          >
            <BiUser className="fill-gray-200 mr-2" size={16} />
            {userName}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-hboPurple4 px-6 py-2 rounded  fade-in-load"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex flex-row w-full justify-between mt-2 sm:m-0 md:w-auto">
          <Link
            to="/sign-in"
            className="px-6 py-2 flex justify-center items-center"
          >
            <BiUser className="fill-gray-200 mr-2" size={16} />
            Sign in
          </Link>
          <Link to="/sign-up" className="bg-hboPurple4 px-6 py-2 rounded">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
