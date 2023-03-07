import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t-8 border-hboPurple5/10 w-full mt-8 bg-black text-gray-300 px-4 py-16 grid lg:grid-cols-3 gap-6 relative">
      <div>
        <h1 className="text-hboPurple4 text-4xl font-bold cursor-pointer select-none text-center">
          CAVEWATCH
        </h1>
        <p className="py-4 text-lg text-center">
          Questions? Call{" "}
          <span className="text-xl text-gray-300 font-bold">1234 567 8900</span>
        </p>
        <div className="md:w-[80%] mx-auto my-6 flex justify-between px-4">
          <a className="cursor-pointer hover:scale-125  duration-300">
            <FaFacebook
              className="fill-gray-300 hover:fill-gray-100"
              size={25}
            />
          </a>{" "}
          <a className="cursor-pointer hover:scale-125  duration-300">
            <FaInstagram
              className="fill-gray-300 hover:fill-gray-100"
              size={25}
            />
          </a>{" "}
          <a className="cursor-pointer hover:scale-125  duration-300">
            <FaTwitter
              className="fill-gray-300 hover:fill-gray-100"
              size={25}
            />
          </a>
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div className="text-left">
          <h6 className="font-medium text-gray-300">Vision</h6>
          <ul className="text-gray-700">
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Mission
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              History
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Team
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Contact
            </li>
          </ul>
        </div>
        <div className="text-left">
          <h6 className="font-medium text-gray-300">Topics</h6>
          <ul className="text-gray-700">
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Sustain
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Works
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              maiores
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              FAQ
            </li>
          </ul>
        </div>
        <div className="text-left">
          <h6 className="font-medium text-gray-300">Support</h6>
          <ul className="text-gray-700">
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Contact
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Center
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Forums
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Nami
            </li>
          </ul>
        </div>
        <div className="text-left">
          <h6 className="font-medium text-gray-300">Legal</h6>
          <ul className="text-gray-700">
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Terms
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Privacy
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Cookies
            </li>
            <li className="py-2 cursor-pointer text-sm  duration-100 hover:text-gray-300">
              Poison
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <img
          className="mx-auto w-[100px] opacity-50"
          src="./assets/attributeLogo.svg"
          alt="attribute"
        />
      </div>
    </footer>
  );
};

export default Footer;
