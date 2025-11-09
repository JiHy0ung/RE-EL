import { useQuery } from "@tanstack/react-query";
import api from "../utills/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movies-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data.results,
  });
};
