import React from "react";
import { useParams } from "react-router";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Box, Divider, Rating, Typography } from "@mui/material";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie } = useMovieDetailQuery(id);
  const { data: reviews } = useMovieReviewsQuery(id);

  console.log(reviews);
  console.log((movie?.vote_average / 2).toFixed(1));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          py: 2,
          px: 8,
        }}
      >
        <Box
          component="img"
          src={
            movie?.poster_path
              ? `https://media.themoviedb.org/t/p/w300_and_h450_face${movie?.poster_path}`
              : "../../../no-poster-image.png"
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "flex-start",
            height: "540px",
            py: 4,
          }}
        >
          <Typography
            color="white"
            fontFamily="Aggravo"
            fontWeight={600}
            fontSize={{ xs: 50 }}
            letterSpacing={"-1.5px"}
          >
            {movie?.title}
          </Typography>
          {movie?.tagline && (
            <Typography
              fontFamily="KnpsOdaesan"
              fontWeight={400}
              fontSize={{ xs: 30 }}
              mb={2}
              sx={{
                background: "linear-gradient(90deg, #fff, #636363ff, #fff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient 5s ease infinite",
                "@keyframes gradient": {
                  "0%": { backgroundPosition: "0% 0%" },
                  "50%": { backgroundPosition: "100% 100%" },
                  "100%": { backgroundPosition: "0% 0%" },
                },
              }}
            >
              "{movie?.tagline}"
            </Typography>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            <Rating
              readOnly
              value={Math.round((movie?.vote_average / 2) * 10) / 10}
              precision={0.1}
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
            <Typography
              color="grey"
              fontFamily="Aggravo"
              fontWeight={300}
              fontSize={10}
            >
              ({Math.round((movie?.vote_average / 2) * 10) / 10})
            </Typography>
            <Typography color="white" fontFamily="Aggravo" fontWeight={300}>
              •
            </Typography>
            {movie?.genres.map((genre) => (
              <Typography color="white" fontFamily="Aggravo" fontWeight={300}>
                <span style={{ boxShadow: "inset 0 -10px 0 #763bd6d3" }}>
                  #{genre?.name}
                </span>
              </Typography>
            ))}
            <Typography color="white" fontFamily="Aggravo" fontWeight={300}>
              • {movie?.runtime}분
            </Typography>
          </Box>
          <Typography color="white" fontFamily="Aggravo" fontWeight={300}>
            {movie?.overview}
          </Typography>
          예산 (숫자 단위가 크기때문에 ,를 붙여주는 형식으로 바꿔서 숫자를
          보여주자)
        </Box>
      </Box>
      <Divider
        variant="middle"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      />
    </Box>
  );
};

export default MovieDetailPage;
