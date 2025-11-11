import { Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "./MovieCard";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <>
      <Typography
        sx={{
          color: "white",
          mb: 2,
          fontSize: { lg: "3rem", md: "2rem", xs: "2rem" },
          fontFamily: "Aggravo",
          letterSpacing: "-1px",
        }}
      >
        {title}
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
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default MovieSlider;
