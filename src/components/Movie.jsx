import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetail, provideDetail } from "../redux/utilSlice";
import { addList, removeList } from "../redux/userSlice";

const Movie = ({ item }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);
  const list = useSelector((state) => state.user.list);
  const [like, setLike] = useState(
    list?.some(
      (movie) =>
        movie.email === session?.email && movie.item.title === item?.title
    )
  );
  const toggleLikeHandler = () => {
    if (session?.email) {
      setLike(true);
      dispatch(addList({ email: session.email, item: item }));
      console.log(list);
    } else {
      alert("You must login to use this feature");
    }
  };
  const toggleDislikeHandler = () => {
    if (session?.email) {
      setLike(false);
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
    <div
      onClick={detailClickHandler}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] cursor-pointer inline-block relative p-2 "
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full text-white hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full">
          {item?.title}
        </p>
        {like ? (
          <FaHeart
            className="absolute top-4 right-4 text-gray-300 hover:text-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleDislikeHandler();
            }}
          />
        ) : (
          <FaRegHeart
            className="absolute top-4 right-4 text-gray-300 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleLikeHandler();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Movie;
