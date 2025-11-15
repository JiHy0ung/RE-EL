import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMovieReviewsQuery } from "../../../hooks/useMovieReviews";

const MovieReview = ({ id }) => {
  const [expandedReviews, setExpandedReviews] = useState({});
  const { data: reviews } = useMovieReviewsQuery(id);

  const toggleReview = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const maxLength = 300; // 리뷰 최대 표시 글자 수

  return (
    <Box sx={{ pt: 2 }}>
      <Typography
        color="white"
        fontFamily="Aggravo"
        fontWeight={500}
        fontSize={24}
        mb={3}
      >
        영화 리뷰 ({reviews?.length || 0})
      </Typography>
      {reviews?.map((review) => {
        const isExpanded = expandedReviews[review.id];
        const shouldShowMore = review.content.length > maxLength;

        return (
          <Box
            key={review.id}
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
            }}
          >
            <Typography
              color="white"
              fontFamily="Aggravo"
              fontWeight={500}
              fontSize={16}
              mb={1}
            >
              {review.author}
            </Typography>
            <Typography
              color="white"
              fontFamily="Aggravo"
              fontWeight={300}
              fontSize={14}
              sx={{ display: "inline" }}
            >
              {isExpanded || !shouldShowMore
                ? review.content
                : `${review.content.slice(0, maxLength)}...`}
            </Typography>
            {shouldShowMore && (
              <Button
                onClick={() => toggleReview(review.id)}
                sx={{
                  color: "#763bd6",
                  fontFamily: "Aggravo",
                  fontWeight: 300,
                  fontSize: 14,
                  textTransform: "none",
                  minWidth: "auto",
                  p: 0,
                  ml: 0.5,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {isExpanded ? "간략하게" : "더보기"}
              </Button>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default MovieReview;
