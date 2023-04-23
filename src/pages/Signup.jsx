import React from "react";
import backgroundImg from "../assests/images/background.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";
import { useEffect } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const session = useSelector((state) => state.user.session);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  useEffect(() => {
    if (session?.email) {
      navigate("/");
    }
  }, [session]);
  return (
    <div className="w-screen h-screen">
      <img
        src={backgroundImg}
        className="object-cover w-full h-full"
        alt="background"
      />
      <div className="w-screen h-screen bg-black opacity-60 fixed top-0" />
      <div className="fixed top-0 left-0 w-full h-screen px-4 py-24 z-50">
        <div className=" bg-black w-full h-[80vh] max-w-[400px] mx-auto flex flex-col ">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-white text-2xl font-bold mb-6">Sign Up</h1>
            <form className=" mb-4 w-full text-white" onSubmit={submitHandler}>
              <input
                type="email"
                className="form-input w-full mb-2 bg-gray-700 rounded"
                placeholder="Email"
                required
                ref={emailRef}
              />
              <input
                type="password"
                className="form-input w-full mb-4 bg-gray-700 rounded"
                placeholder="Password"
                required
                ref={passwordRef}
              />
              <button
                type="submit"
                className="bg-red-600 w-full px-6 py-2 hover:bg-red-800 text-white font-bold rounded block"
              >
                Sign Up
              </button>
            </form>

            <div className="flex flex-row justify-between items-center text-sm text-gray-600 mb-8">
              <p>Need Help?</p>
            </div>

            <p className="text-sm">
              <span className="text-gray-600">
                Already have a Netflix account?
              </span>{" "}
              <Link className="text-white font-bold" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
