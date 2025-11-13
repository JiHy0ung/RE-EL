import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router";
import { Alert, Box, Grid, Pagination } from "@mui/material";
import MovieCard from "../../common/components/MovieCard";

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <Alert variant="error">{error.message}</Alert>;
  }

  const handlePageClick = (e, value) => {
    setPage(value);
  };

  console.log(data);
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item size={{ lg: 3, md: 4, xs: 12 }}>
          filter
        </Grid>
        {data?.results.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
              my: 4,
              color: "gray",
            }}
          >
            "{keyword}"의 결과가 없습니다.
          </Box>
        ) : (
          <Grid item size={{ lg: 9, md: 8, xs: 12 }}>
            <Grid container spacing={1} sx={{ px: 4 }}>
              {data?.results.map((movie, index) => (
                <Grid
                  item
                  key={index}
                  size={{ xl: 3, lg: 4, md: 6, sm: 6, xs: 12 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Pagination
        count={data?.total_pages}
        color="secondary"
        size="small"
        showFirstButton
        showLastButton
        onChange={handlePageClick}
        page={page}
        sx={{
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "grey",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default MoviesPage;
