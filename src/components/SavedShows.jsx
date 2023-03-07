import React, { useRef, useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);

  const { user, isMobileDevice } = useGlobalContext();

  const sliderRef = useRef(null);

  useEffect(() => {
    if (!isMobileDevice()) {
      const handleScroll = () => {
        const allTheWidth = sliderRef.current.scrollWidth;
        const visibleWidth = sliderRef.current.clientWidth;
        const widthScrolled = sliderRef.current.scrollLeft;

        // With this if there isn't more content to scroll, the corresponding button will disappear
        if (widthScrolled <= 0) {
          setShowLeftButton(false);
          // console.log("Hiding left button");
        } else {
          setShowLeftButton(true);
          // console.log("Showing left button");
        }

        if (
          widthScrolled >= allTheWidth - visibleWidth ||
          allTheWidth <= visibleWidth
        ) {
          setShowRightButton(false);
          // console.log("Hiding right button");
        } else {
          setShowRightButton(true);
          // console.log("Showing right button");
        }
      };

      if (sliderRef.current) {
        sliderRef.current.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -280,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 280,
        behavior: "smooth",
      });
    }
  };

  const moviesReference = doc(db, "users", `${user?.email}`);

  const deleteMovie = async (id) => {
    try {
      const updatedShows = movies.filter((movie) => movie.id !== id);
      await updateDoc(moviesReference, {
        savedShows: updatedShows,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(moviesReference, (doc) => {
      setMovies(doc.data()?.savedShows);
      setLoading(false);
    });
  }, [user?.email]);

  return (
    <div>
      <>
        <h2 className="font-bold md:text-xl p-4">Saved shows</h2>
        <div className="relative flex items-center group">
          {loading && (
            <div className="w-full flex item-center justify-center h-[148px]">
              <ImSpinner2 className="fill-hboPurple2 animate-spin" size={40} />
            </div>
          )}
          {!isMobileDevice() && (
            <MdNavigateBefore
              onClick={scrollLeft}
              size={30}
              className={
                "navigate-btn active:bg-hboPurple2  hidden group-hover:flex absolute cursor-pointer  items-center justify-center bg-hboPurple1/60 left-[10px] rounded-full hover:bg-hboPurple1 hover:fill-white duration-300 z-10 fill-gray-300 top-1/2 -translate-y-1/2 " +
                (showLeftButton ? "opacity-1 visible" : "opacity-0 invisible")
              }
            />
          )}
          <div
            ref={sliderRef}
            id={`slider`}
            className="slider overflow-x-scroll whitespace-nowrap relative"
          >
            {!loading &&
              movies?.map((movie, id) => (
                <div
                  key={id}
                  className="movie-box fade-in-load relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2 duration-150 hover:scale-110 overflow-hidden"
                >
                  <img
                    className="object-cover w-full block"
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/original/${movie.img}`}
                    alt={`${movie.title}`}
                  />
                  <div className="absolute cursor-pointer left-0 top-0 h-full w-full opacity-0 duration-200 hover:opacity-100">
                    <p className="text-xs md:text-sm font-bold flex justify-center items-center h-full text-center whitespace-normal p-2">
                      {movie.title}
                    </p>
                    <AiOutlineClose
                      onClick={() => deleteMovie(movie.id)}
                      className="absolute right-4 top-4 duration-200 fill-gray-500 hover:fill-gray-100 hover:scale-110"
                    />
                  </div>
                </div>
              ))}{" "}
          </div>
          {(!movies || movies.length === 0) && !loading && (
            <div className="w-full p-4 text-center h-[148px]">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-hboPurple2 mx-auto pb-2">
                You didn't save anything yet.
              </p>
            </div>
          )}
          {!isMobileDevice() && (
            <MdNavigateNext
              onClick={scrollRight}
              size={30}
              className={
                "navigate-btn active:bg-hboPurple2  hidden group-hover:flex absolute cursor-pointer  items-center justify-center bg-hboPurple1/60 right-[10px] rounded-full hover:bg-hboPurple1 hover:fill-white duration-300 z-10 fill-gray-300 top-1/2 -translate-y-1/2 " +
                (showRightButton ? "opacity-1 visible" : "opacity-0 invisible")
              }
            />
          )}
        </div>
      </>
    </div>
  );
};

export default SavedShows;
