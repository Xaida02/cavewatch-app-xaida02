import React from "react";
import { SavedShows } from "../components";

const Account = () => {
  return (
    <section>
      <div className="w-full">
        <img
          className="w-full h-[400px] object-cover"
          src="./assets/blurredBg.jpg"
          alt="banner"
        />
        <div className="z-10 absolute w-full h-[400px] bg-black/70 top-0 left-0"></div>
        <div className="flex z-[15] flex-col absolute top-[20%] p-4 md:p-8">
          <h2 className="font-bold text-3xl md:text-5xl">My shows</h2>
        </div>
      </div>
      <SavedShows />
    </section>
  );
};

export default Account;
