import React from "react";
import Banner from "./components/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide";
import UpComingMovieSlide from "./components/UpComingMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Banner />
      <PopularMovieSlide />
      <UpComingMovieSlide />
      <TopRatedMovieSlide />
    </Box>
  );
};

export default LandingPage;
