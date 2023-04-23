import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Request";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addList, removeList } from "../redux/userSlice";

const Main = () => {
  const [movie, setMovie] = useState([]);
  const list = useSelector((state) => state.user.list);
  const [like, setLike] = useState();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.session);

  const toggleLikeHandler = () => {
    if (session?.email) {
      setLike(true);
      dispatch(addList({ email: session.email, item: movie }));
    } else {
      alert("You must login to use this feature");
    }
  };
  const toggleDislikeHandler = () => {
    if (session?.email) {
      setLike(false);
      dispatch(removeList({ email: session.email, item: movie }));
    } else {
      alert("You must login to use this feature");
    }
  };

  useEffect(() => {
    axios.get(requests.requestTrending).then((res) => {
      const movies = res.data.results;
      const index = Math.floor(Math.random() * movies.length);
      setMovie(movies[index]);
      setLike(
        list?.some(
          (movie) =>
            movie.email === session?.email &&
            movie.item.title === movies[index].title
        )
      );
    });
  }, []);

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="text-white w-full h-[550px]">
      <div className="w-full h-full">
        <div className="w-full h-[550px] bg-gradient-to-r from-black absolute"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[20%] w-full p-4 md:p-8">
          <h1 className="text-white font-bold text-3xl md:text-5xl">
            {movie?.title}
          </h1>
          <div className="my-4">
            <button className="p-2 bg-gray-100 hover:opacity-80 text-black w-32 border">
              Play
            </button>
            {like ? (
              <button
                className="p-2 w-32 hover:bg-gray-600 border ml-2"
                onClick={toggleDislikeHandler}
              >
                <AiOutlineCheck className="inline-block text-xl font-bold" />
              </button>
            ) : (
              <button
                className="p-2 w-32 hover:bg-gray-600 border ml-2"
                onClick={toggleLikeHandler}
              >
                Watch Later
              </button>
            )}
          </div>
          <p className="text-gray-400">Released: {movie?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[35%]">
            {truncateString(movie.overview ? movie.overview : "", 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
