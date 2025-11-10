import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { Alert, Box, Typography } from "@mui/material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log(data);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <Alert variant="error">{error.message}</Alert>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box p={5}>
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Popular Movies
      </Typography>
      <Box
        sx={{
          "& .react-multi-carousel-list": {
            overflow: "visible !important",
          },
          "& .react-multi-carousel-track": {
            overflow: "visible !important",
          },
          "& .react-multi-carousel-list:hover .movie-slider": {
            filter: "blur(3px)",
            opacity: 0.6,
          },
          "& .react-multi-carousel-list .movie-slider:hover": {
            filter: "blur(0px)",
            opacity: 1,
            transform: "scale(1.15)",
            zIndex: 10,
          },
          "& .movie-slider": {
            transition:
              "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
            overflow: "visible !important",
          },
        }}
      >
        <Carousel
          infinite={true}
          centerMode={true}
          itemClass="movie-slider p-1"
          containerClass="carousel-container"
          responsive={responsive}
        >
          {data.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default PopularMovieSlide;
