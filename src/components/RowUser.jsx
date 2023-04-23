import React from "react";
import MovieUser from "./MovieUser";
import { useSelector } from "react-redux";

const RowUser = (props) => {
  const list = useSelector((state) => state.user.list);
  const movies = list.map((movie) => movie.item);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{props.title}</h2>
      <div
        id={"slider" + props.rowID}
        className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {movies.map((item, id) => {
          return <MovieUser item={item} key={id} />;
        })}
      </div>
    </>
  );
};

export default RowUser;
