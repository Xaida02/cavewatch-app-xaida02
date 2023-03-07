import axios from "axios";
import React, { useState, useEffect } from "react";
import requests from "../request";
import { BsFillPlayFill } from "react-icons/bs";
import "./Hero.css";

const { requestPopular } = requests;

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(requestPopular).then((response) => {
      const responseMovies = response.data.results;
      setMovies(responseMovies);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (movies.length) {
      setHeroMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  }, [movies]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleStringLength = (str) => {
    const shortString = str?.slice(0, 150);

    if (str?.length > 150) {
      return (
        <>
          {!showMore ? shortString + "..." : str}{" "}
          <span
            onClick={toggleShowMore}
            className="font-semibold duration-300 hover:border-gray-200 border-b border-transparent cursor-pointer"
          >
            {showMore ? " show less" : " show more"}
          </span>
        </>
      );
    } else {
      return str;
    }
  };

  return (
    <div className="h-[550px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
        {loading && (
          <div className="bg-gray-800/50 w-full h-full rounded"></div>
        )}
        <img
          loading="lazy"
          className={`w-full h-full object-cover fade-in-load ${
            loading ? "hidden" : ""
          }`}
          src={`https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path}`}
          alt={`${heroMovie.title} banner`}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="flex flex-col absolute top-[20%] p-4 md:p-8">
        <h2 className="font-bold text-3xl md:text-5xl">
          {heroMovie.original_title}
        </h2>

        <div className="my-4 flex items-center">
          <button className="duration-300 flex justify-between items-center bg-gray-300 border border-gray-300 text-black py-2 hover:text-gray-300 active:bg-gray-300/10 hover:bg-transparent px-5 transition-colors">
            <BsFillPlayFill size={20} className="play-button duration-300" />{" "}
            Play
          </button>
          <button className="duration-300 text-gray-300 border border-gray-300 hover:text-black hover:border-transparent hover:bg-gray-300 ml-4 py-2 px-5 transition-colors active:bg-white">
            Watch later
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Released: {heroMovie.release_date}
        </p>
        <div className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
          <p
            key={showMore ? "long" : "short"}
            className={`text-gray-200 text-md fade-in`}
          >
            {handleStringLength(heroMovie.overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
