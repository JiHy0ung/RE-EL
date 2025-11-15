import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Pagination,
  Select,
} from "@mui/material";
import MovieCard from "../../common/components/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { data: genres } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sort,
    genreId: selectedGenre,
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

  const handleSort = () => {
    setSort((prev) => (prev === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  console.log(data);
  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: { xs: 1, sm: 5, lg: 20 },
          mb: 5,
        }}
      >
        <Breadcrumbs
          maxItems={genres.length}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& .MuiBreadcrumbs-ol": {
              justifyContent: "center",
            },
            "& .MuiBreadcrumbs-separator": {
              color: "grey",
            },
          }}
        >
          {genres.map((genre) => (
            <Button
              disableRipple
              sx={{ color: "#ffffff" }}
              onClick={() => {
                setSelectedGenre(genre.id);
                setPage(1);
              }}
            >
              {genre.name}
            </Button>
          ))}
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button sx={{ width: "100px", color: "white" }} onClick={handleSort}>
            인기도
            {sort === "desc" ? (
              <p className="popularity-desc">⬆︎</p>
            ) : (
              <p className="popularity-asc">⬇︎</p>
            )}
          </Button>
        </Box>
      </Box>
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
        <Grid
          container
          spacing={1}
          sx={{ px: { xl: 20, lg: 15, md: 10, sm: 5 } }}
        >
          {data?.results.map((movie, index) => (
            <Grid
              item
              key={index}
              size={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }}
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
      )}
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
