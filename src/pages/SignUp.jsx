import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUp } = useGlobalContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password, userName);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="w-full h-screen">
      <img
        className="w-full h-full object-cover absolute hidden sm:block"
        src="./assets/blurredBg.jpg"
        alt="banner"
      />
      <div className="z-10 fixed w-full h-full bg-black/70 top-0 left-0"></div>
      <div className="fixed w-full px-4 py-10 xl:py-24 z-50">
        <div className=" bg-black/75 max-w-[450px] h-[600px] mx-auto">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setUserName(e.target.value)}
                className="bg-gray-700 rounded p-3 my-2 focus:outline-none focus:ring-2 focus:ring-hboPurple2"
                placeholder="Username"
                required
                maxLength={8}
                type="text"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 rounded p-3 my-2 focus:outline-none focus:ring-2 focus:ring-hboPurple2"
                placeholder="Email"
                required
                type="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 rounded p-3 my-2 focus:outline-none focus:ring-2 focus:ring-hboPurple2"
                placeholder="Password"
                required
                type="password"
              />
              <button
                type="submit"
                className="bg-hboPurple4 px-6 py-2 rounded my-6"
              >
                Sign up
              </button>
              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  <input className="mr-2 " type="checkbox" />
                  Remember me
                </p>
                <p className="mr-2 cursor-pointer">Need Help?</p>
              </div>
              <p className="my-6">
                <span className="mr-2 text-gray-400 text-sm">
                  Already have an account?{" "}
                </span>
                <Link to="/sign-in" className="text-gray-200 ">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
