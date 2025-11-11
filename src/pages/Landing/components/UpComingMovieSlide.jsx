import React from "react";
import { Alert, Box, Typography } from "@mui/material";

import "react-multi-carousel/lib/styles.css";
import { useUpComingMoviesQuery } from "../../../hooks/useUpComingMovies";
import { responsive } from "../../../constants/responsive";
import MovieSlider from "../../../common/components/MovieSlider";

const UpComingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();

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
        title={"UpComing Movies"}
        movies={data}
        responsive={responsive}
      />
    </Box>
  );
};

export default UpComingMovieSlide;
