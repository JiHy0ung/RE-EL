import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "330px",
        width: "220px",
        mx: 1,
        position: "relative",
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <Box
        component="img"
        src={
          movie?.poster_path
            ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie?.poster_path}`
            : "../../../no-poster-image.png"
        }
        sx={{ height: "330px", width: "100%", objectFit: "cover", p: 2 }}
      />
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          py: 3,
          px: 3,
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {movie.adult && (
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                borderRadius: "35px",
                px: 1,
                py: 1,
                letterSpacing: "-1.25px",
              }}
            >
              +19
            </Typography>
          )}
          <Typography variant="h5" sx={{ color: "white" }}>
            {movie.title}
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", maxWidth: "100%" }}
        >
          {showGenre(movie.genre_ids).map((id) => (
            <Chip color="secondary" size="small" label={id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCard;
