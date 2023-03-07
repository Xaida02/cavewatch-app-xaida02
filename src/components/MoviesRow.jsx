import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { SingleMovie } from "../components";
import "./MoviesRow.css";
import { ImSpinner2 } from "react-icons/im";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useGlobalContext } from "../context";

const MoviesRow = ({ category, targetURL }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);

  const { isMobileDevice } = useGlobalContext();

  useEffect(() => {
    axios
      .get(targetURL)
      .then((response) => {
        const responseMovies = response.data.results;
        setMovies(responseMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [targetURL]);

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

        if (widthScrolled >= allTheWidth - visibleWidth) {
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

  return (
    <>
      <h2 className="font-bold md:text-xl p-4">{category}</h2>
      <div className="relative flex items-center group duration-300 transition-all">
        {loading && (
          <div className="w-full h-[148px] flex item-center justify-center">
            <ImSpinner2 className="fill-hboPurple2 animate-spin" size={40} />
          </div>
        )}
        {!isMobileDevice() && (
          <MdNavigateBefore
            onClick={scrollLeft}
            size={30}
            className={
              "active:bg-hboPurple2 button-shadow hidden group-hover:flex absolute cursor-pointer  items-center justify-center bg-hboPurple1 left-[10px] rounded-full hover:bg-hboPurple1 hover:fill-white duration-[0.8s] z-10 fill-gray-300 top-1/2 -translate-y-1/2 " +
              (showLeftButton ? "opacity-1 visible" : "opacity-0 invisible")
            }
          />
        )}
        <div
          ref={sliderRef}
          id={`slider`}
          className="slider overflow-x-scroll overflow-y-hidden whitespace-nowrap relative"
        >
          {!loading &&
            movies?.map((movie, id) => (
              <SingleMovie movie={movie} key={id} />
            ))}{" "}
        </div>
        {!isMobileDevice() && (
          <MdNavigateNext
            onClick={scrollRight}
            size={30}
            className={
              "active:bg-hboPurple2 button-shadow hidden group-hover:flex absolute cursor-pointer  items-center justify-center bg-hboPurple1 right-[10px] rounded-full hover:bg-hboPurple1 hover:fill-white duration-[0.8s] z-10 fill-gray-300 top-1/2 -translate-y-1/2 " +
              (showRightButton ? "opacity-1 visible" : "opacity-0 invisible")
            }
          />
        )}
      </div>
    </>
  );
};

export default MoviesRow;
