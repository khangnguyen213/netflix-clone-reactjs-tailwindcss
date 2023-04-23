import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";

const Row = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(props.fetchURL).then((res) => setMovies(res.data.results));
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + props.rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + props.rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{props.title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          onClick={slideLeft}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10 left-0 hidden group-hover:block cursor-pointer"
        />
        <div
          id={"slider" + props.rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => {
            return <Movie item={item} key={id} />;
          })}
        </div>
        <MdChevronRight
          size={40}
          onClick={slideRight}
          className="bg-white  rounded-full absolute opacity-50 hover:opacity-100 z-10 right-0 hidden group-hover:block cursor-pointer"
        />
      </div>
    </>
  );
};

export default Row;
