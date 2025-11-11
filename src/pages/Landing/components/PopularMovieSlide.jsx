import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { Alert, Box, Typography } from "@mui/material";

import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../common/components/MovieSlider";

import { responsive } from "../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
        title={"Popular Movies"}
        movies={data}
        responsive={responsive}
      />
    </Box>
  );
};

export default PopularMovieSlide;
