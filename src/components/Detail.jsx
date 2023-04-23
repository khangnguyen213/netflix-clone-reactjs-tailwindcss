import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetail } from "../redux/utilSlice";
import axios from "axios";
import { API_KEY } from "../Request";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { addList, removeList } from "../redux/userSlice";

const Detail = () => {
  const display = useSelector((state) => state.util.displayDetail);
  const item = useSelector((state) => state.util.item);
  const list = useSelector((state) => state.user.list);
  const session = useSelector((state) => state.user.session);
  const [like, setLike] = useState(
    list?.some(
      (movie) =>
        movie.email === session?.email && movie.item.title === item?.title
    )
  );
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const toggleLikeHandler = () => {
    if (session?.email) {
      setLike(true);
      dispatch(addList({ email: session.email, item: item }));
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

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}&language=en-US`
      )
      .then((res) =>
        setVideos(res.data.results.filter((video) => video.site === "YouTube"))
      );
  }, [item]);

  const video = videos ? videos[0] : null;

  const toggleDetailHandler = () => {
    dispatch(toggleDetail());
  };

  return (
    <>
      {display && (
        <div
          className="fixed w-full h-screen backdrop-blur-md backdrop-brightness-50 z-[999] flex items-center justify-center"
          onClick={toggleDetailHandler}
        >
          <div
            className="text-white w-full md:w-[75%] h-[550px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-[75%] h-[550px] bg-gradient-to-r from-black absolute"></div>
            <AiOutlineClose
              className="absolute text-2xl opacity-75 right-2 md:right-[15%] top-[5%] cursor-pointer"
              onClick={toggleDetailHandler}
            />
            <img
              src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
              alt={item?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[5%] md:top-[20%] w-full md:max-w-[35%] p-4 md:p-8">
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                {item?.title}
              </h1>
              <div className="my-4">
                <button className="p-2 bg-gray-100 text-black w-32 border">
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
              <p className="text-gray-400">Released: {item?.release_date}</p>
              <p className="w-full">
                {item && truncateString(item.overview, 150)}
              </p>
            </div>
            <div className="absolute top-[45%] sm:top-[40%] md:top-[20%] left-0 md:left-[45%] w-[70%] md:max-w-[43%] p-4 md:p-8 ">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${video?.key}`}
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
