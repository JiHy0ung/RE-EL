import React from "react";
import { Alert, Box, Typography } from "@mui/material";

import "react-multi-carousel/lib/styles.css";
import { useTopRatedMoviesQuery } from "../../../hooks/useTopRatedMovies";
import { responsive } from "../../../constants/responsive";
import MovieSlider from "../../../common/components/MovieSlider";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  console.log(data);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <Alert variant="error">{error.message}</Alert>;
  }

  return (
    <Box p={3}>
      <MovieSlider
        title={"Top Rated Movies"}
        movies={data}
        responsive={responsive}
      />
    </Box>
  );
};

export default TopRatedMovieSlide;
