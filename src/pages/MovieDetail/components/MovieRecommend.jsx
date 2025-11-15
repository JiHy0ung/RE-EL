import React from "react";
import { useMovieRecommendQuery } from "../../../hooks/useMovieRecommend";
import { Box, Grid, Typography } from "@mui/material";

import MovieCard from "../../../common/components/MovieCard";

const MovieRecommend = ({ id }) => {
  const { data: recommend } = useMovieRecommendQuery(id);

  return (
    <Box>
      <Typography
        color="white"
        fontFamily="Aggravo"
        fontWeight={500}
        fontSize={24}
        mb={3}
      >
        추천 영화
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xl: 20, lg: 15, md: 10, sm: 5 },
        }}
      >
        {recommend?.map((movie, index) => (
          <Grid
            item
            key={index}
            size={{ xl: 3, lg: 3, md: 4, sm: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieRecommend;
