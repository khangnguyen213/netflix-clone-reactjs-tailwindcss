import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";

const Home = () => {
  return (
    <div>
      <Main />
      <Row rowID={"1"} title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID={"2"} title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row
        rowID={3}
        title="Netflix Original"
        fetchURL={requests.requestNetflixOriginals}
      />
      <Row rowID={"4"} title="Action" fetchURL={requests.requestActionMovies} />
      <Row rowID={"5"} title="Comedy" fetchURL={requests.requestComedyMovies} />
      <Row rowID={"6"} title="Horror" fetchURL={requests.requestHorrorMovies} />
    </div>
  );
};

export default Home;
