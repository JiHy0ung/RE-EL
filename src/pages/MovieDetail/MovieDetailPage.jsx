import React, { useState } from "react";
import { useParams } from "react-router";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Box, Button, Divider, Modal, Rating, Typography } from "@mui/material";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";
import { Film, X } from "lucide-react";
import YouTube from "react-youtube";
import { useMovieRecommendQuery } from "../../hooks/useMovieRecommend";
import MovieReview from "./components/MovieReview";
import MovieRecommend from "./components/MovieRecommend";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie } = useMovieDetailQuery(id);
  const { data: trailer } = useMovieTrailerQuery(id);
  const { data: recommend } = useMovieRecommendQuery(id);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Box sx={{ py: 2, px: { xs: 4, sm: 6, md: 8 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
            "&:hover .trailer-button": {
              opacity: 1,
            },
            "&:hover img": {
              filter: "brightness(0.5)",
            },
          }}
        >
          <Box
            component="img"
            src={
              movie?.poster_path
                ? `https://media.themoviedb.org/t/p/w300_and_h450_face${movie?.poster_path}`
                : "../../../no-poster-image.png"
            }
            sx={{
              display: "block",
              transition: "filter 0.3s ease",
            }}
          />
          <Button
            disableFocusRipple
            disableTouchRipple
            className="trailer-button"
            onClick={handleOpen}
            sx={{
              position: "absolute",
              bottom: "50%",
              left: "50%",
              transform: "translate(-50%, 50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
              color: "black",
              backgroundColor: "white",
              fontFamily: "Aggravo",
              fontWeight: "300",
              pr: 1.5,
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "auto",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Film size={23} style={{ paddingBottom: "3px" }} />
            예고편 보러가기
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "flex-start",
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
              <Typography
                key={genre.id}
                color="white"
                fontFamily="Aggravo"
                fontWeight={300}
              >
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
        </Box>
      </Box>
      <Divider
        variant="middle"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", my: 4 }}
      />

      <MovieReview id={id} />

      <MovieRecommend id={id} />

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
            aspectRatio: "16/9",
            backgroundColor: "black",
            outline: "none",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              minWidth: "auto",
              padding: 1,
              zIndex: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <X size={24} />
          </Button>
          {trailer ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                "& iframe": {
                  width: "100%",
                  height: "100%",
                },
              }}
            >
              <YouTube
                videoId={trailer.key}
                opts={opts}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "white",
                fontFamily: "Aggravo",
              }}
            >
              <Typography>예고편을 제공하지 않는 영화입니다.</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieDetailPage;
