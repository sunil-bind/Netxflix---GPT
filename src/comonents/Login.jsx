import React, { useRef, useState } from "react";
import Header from "./Header";
import { formValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInFrom, setIsSignInForm] = useState(true);
  const [formError, setFormError] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleForm = () => {
    setIsSignInForm(!isSignInFrom);
  };
  const handleSubmit = () => {
    const isValid = formValidation(email.current.value, password.current.value);
    console.log(isValid);
    setFormError(isValid);
    if (isValid) return;

    //SigIn Logic
    if (isSignInFrom) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(errorCode + " " + errorMessage);
        });
    } else {
      //sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: email.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(errorCode + " " + errorMessage);
        });
    }
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold my-3 text-3xl">
          {isSignInFrom ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInFrom && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="enter your Email"
          className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-3 w-full bg-gray-900 bg-opacity-80"
        />
        {formError && (
          <p className="p-2 my-0 font-bold text-red-600">{formError}</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full p-2 my-6 bg-red-700 rounded-lg"
        >
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
