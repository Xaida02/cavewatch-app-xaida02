import React from "react";
import { Footer, Hero, MoviesRow } from "../components";
import requests from "../request";

const Home = () => {
  const {
    requestPopular,
    requestTrending,
    requestTopRated,
    requestLatest,
    requestHorror,
    requestUpcoming,
  } = requests;

  return (
    <div className="w-full h-full m-auto">
      <Hero />
      <MoviesRow category="Popular" targetURL={requestPopular} />
      <MoviesRow category="Trending" targetURL={requestTrending} />
      <MoviesRow category="Top rated" targetURL={requestTopRated} />
      <MoviesRow category="Latest" targetURL={requestLatest} />
      <MoviesRow category="Horror" targetURL={requestHorror} />
      <MoviesRow category="Cooming soon" targetURL={requestUpcoming} />
      <Footer />
    </div>
  );
};

export default Home;
