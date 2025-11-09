import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { Alert, Box, Typography } from "@mui/material";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <Alert variant="error">{error.message}</Alert>;
  }

  return (
    <Box
      sx={{
        height: "56vh",
        backgroundPosition: "center",
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data[0]?.backdrop_path}` +
          ")",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "65vh",
          background: "linear-gradient(to top, black, transparent)",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          px: 5,
          py: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h2" sx={{ color: "white", fontFamily: "Heiro" }}>
          {data[0]?.title}
        </Typography>
        <Typography variant="p" sx={{ width: "55%", color: "white" }}>
          {data[0]?.overview}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
