import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SingleMovie.css";

const SingleMovie = ({ movie }) => {
  const { user } = useGlobalContext();
  const [fav, setFav] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  const { userSavedMovies } = useGlobalContext();

  useEffect(() => {
    const isSaved = userSavedMovies?.some(
      (savedMovie) => savedMovie.id === movie.id
    );
    setFav(isSaved);
  }, [movie.id, userSavedMovies]);

  const moviesReference = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user) {
      if (!fav) {
        setFav(true);
        setSaved(true);
        await updateDoc(moviesReference, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path,
          }),
        });
      } else {
        setFav(false);
        await updateDoc(moviesReference, {
          savedShows: arrayRemove({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path,
          }),
        });
      }
    } else {
      navigate("/sign-in");
      alert("Log in to save a movie.");
    }
  };

  if (!movie?.backdrop_path) {
    return;
    // It seems that some movies don't come with an image, so i dont want them to render at all
  }

  return (
    <div className="fade-in-load relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2 duration-150 hover:scale-110 overflow-hidden movie-box">
      <img
        className="object-cover w-full block duration-200"
        loading="lazy"
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={`${movie?.title}`}
      />
      <div className="absolute cursor-pointer left-0 top-0 h-full w-full opacity-0 duration-200 hover:opacity-100">
        <p className="text-xs md:text-sm font-bold flex justify-center items-center h-full text-center whitespace-normal p-2">
          {movie.title}
          <div onClick={saveShow}>
            {fav ? (
              <FaHeart
                size={15}
                className="fill-gray-300 absolute left-[13px] top-4 fade-in-load"
              />
            ) : (
              <FaRegHeart
                size={15}
                className="fill-gray-300 absolute left-[13px] top-4 fade-in-load"
              />
            )}
          </div>
        </p>
      </div>
    </div>
  );
};

export default SingleMovie;
