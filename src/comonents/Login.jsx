import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInFrom, setIsSignInForm] = useState(true);
  const toggleForm = () => {
    setIsSignInForm(!isSignInFrom);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="cover"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold my-3">{isSignInFrom?'Sign In':'Sign Up'}</h1>
        {!isSignInFrom && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
          />
        )}
        <input
          type="text"
          placeholder="enter your Email"
          className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
        />
        <button className="w-full p-4 my-6 bg-red-700 rounded-lg">
          {isSignInFrom ? "Sign In" : "sign UP"}
        </button>
        <p className="py-3 font-normal cursor-pointer" onClick={toggleForm}>
          {!isSignInFrom
            ? " Already registered? Sign In Now."
            : "New to Netflix? Sign up now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
