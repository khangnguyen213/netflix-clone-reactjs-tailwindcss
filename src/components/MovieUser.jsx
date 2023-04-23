import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetail, provideDetail } from "../redux/utilSlice";
import { removeList } from "../redux/userSlice";

const MovieUser = ({ item }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);

  const toggleDislikeHandler = () => {
    if (session?.email) {
      dispatch(removeList({ email: session.email, item: item }));
    } else {
      alert("You must login to use this feature");
    }
  };

  const detailClickHandler = () => {
    dispatch(provideDetail(item));
    dispatch(toggleDetail());
  };

  return (
    <div onClick={detailClickHandler} className="relative cursor-pointer p-2 ">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full text-white hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full">
          {item?.title}
        </p>
        <IoCloseSharp
          className="absolute text-xl top-4 right-4 text-gray-300 hover:text-white hover:bg-slate-600 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleDislikeHandler();
          }}
        />
      </div>
    </div>
  );
};

export default MovieUser;
