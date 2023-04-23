import React from "react";
import logo2 from "../assests/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const NavBar = () => {
  const session = useSelector((state) => state.user.session);
  console.log(session);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 z-[100] w-full absolute">
      <img
        src={logo2}
        className="h-10 cursor-pointer"
        alt="NETFLIX"
        onClick={() => navigate("/")}
      />
      <div>
        {!session?.email && (
          <button
            className="text-white px-6 py-2 hover:bg-slate-500"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}

        {!session?.email && (
          <button
            className="bg-red-600 px-6 py-2 hover:bg-red-800 text-white"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}

        {session?.email && (
          <button
            className="text-white pr-4"
            onClick={() => navigate("/account")}
          >
            My List
          </button>
        )}
        {session?.email && (
          <button
            className="bg-red-600 px-6 py-2 text-white"
            onClick={logOutHandler}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
